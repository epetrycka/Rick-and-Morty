import React, { useEffect, useState, useRef } from 'react';
import './CharactersList.css';
import FilterBar from '../../components/FilterBar';
import Cards from '../../components/Cards';
import { Pagination, Button } from 'semantic-ui-react';

export default function CharactersList() {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const cache = useRef({});

  useEffect(() => {
    const filterParams = Object.entries(filters)
      .filter(([_, value]) => value && value !== 'all')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const url = `https://rickandmortyapi.com/api/character/?page=${page}${filterParams ? `&${filterParams}` : ''}`;

    if (cache.current[url]) {
      setCharacters(cache.current[url]); 
      return;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        cache.current[url] = data.results;
        setCharacters(data.results || []);
        setTotalPages(data.info?.pages || 1);
      })
      .catch(error => console.error("Error fetching characters:", error));

  }, [page, filters]);

  useEffect(() => {
    const filterParams = Object.entries(filters)
      .filter(([_, value]) => value && value !== 'all')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const nextPage = page + 1;
    if (nextPage > totalPages) return;

    const nextUrl = `https://rickandmortyapi.com/api/character/?page=${nextPage}${filterParams ? `&${filterParams}` : ''}`;

    if (!cache.current[nextUrl]) {
      fetch(nextUrl)
        .then(response => response.json())
        .then(data => {
          cache.current[nextUrl] = data.results;
        })
        .catch(error => console.error("Error prefetching next page:", error));
    }
  }, [page, filters, totalPages]);

  const handleFilter = (key, value) => {
    setFilters(prev => {
      const updatedFilters = { ...prev };
      value === 'all' ? delete updatedFilters[key] : updatedFilters[key] = value;
      return updatedFilters;
    });
    setPage(1);
  };

  return (
    <div className="characters-container">
      <nav className="section nav">
        <FilterBar onFilter={handleFilter} />
      </nav>
      <div className="section main-content">
        <div className="sidebar">
          <Button aria-label='arrow right'
            icon="arrow left" 
            style={{ width: '100%', margin: '2rem' }} 
            disabled={page === 1}
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          />
        </div>
        <div className="content">
          <Cards characters={characters} />
        </div>
        <div className="sidebar">
          <Button 
            icon="arrow right" 
            style={{ width: '100%', margin: '2rem' }} 
            disabled={page === totalPages}
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          />
        </div>
      </div>
      <footer className="section footer">
        <Pagination 
          activePage={page} 
          totalPages={totalPages} 
          onPageChange={(_, { activePage }) => setPage(activePage)}
          size="mini"
        />
      </footer>
    </div>
  );
}