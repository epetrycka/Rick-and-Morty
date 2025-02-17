import React, { useEffect, useState, useRef } from 'react';
import { Pagination, Button } from 'semantic-ui-react';

import './CharactersList.css';

import FilterBar from '../../components/FilterBar';
import Cards from '../../components/Cards';

export default function CharactersList() {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const cache = useRef({});

  const fetchCharacters = (pageNumber, appliedFilters) => {
    const filterParams = Object.entries(appliedFilters)
      .filter(([_, value]) => value && value !== 'all')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const url = `https://rickandmortyapi.com/api/character/?page=${pageNumber}${filterParams ? `&${filterParams}` : ''}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        cache.current[url] = data.results;
        setCharacters(data.results || []);
        setTotalPages(data.info?.pages || 1);
      })
      .catch(error => console.error("Error fetching characters:", error));
  };

  useEffect(() => {
    fetchCharacters(page, filters);
  }, [page, filters]);

  useEffect(() => {
    const nextPage = page + 1;
    if (nextPage > totalPages) return;

    const filterParams = Object.entries(filters)
      .filter(([_, value]) => value && value !== 'all')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

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
      if (value === 'all') {
        delete updatedFilters[key];
      } else {
        updatedFilters[key] = value;
      }
      
      setPage(1);
      setTotalPages(1);

      fetchCharacters(1, updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <div className="characters-container">
      <nav className="section filter">
        <FilterBar onFilter={handleFilter} />
      </nav>


      <div className="section characters-content">
        <div className="sidebar">
          <Button
            aria-label='arrow left'
            icon="arrow left" 
            style={{ width: '100%', margin: '0.5rem' }} 
            disabled={page === 1}
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          />
        </div>

        <div className="cards-content">
          <Cards characters={characters} />
        </div>

        <div className="sidebar">
          <Button 
            aria-label="next page"
            icon="arrow right" 
            style={{ width: '100%', margin: '0.5rem' }} 
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
