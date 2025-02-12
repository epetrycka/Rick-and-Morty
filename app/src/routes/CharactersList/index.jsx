import React, { useEffect, useState } from 'react';
import './CharactersList.css';
import FilterBar from '../../components/FilterBar';
import Cards from '../../components/Cards';
import { Pagination, Button } from 'semantic-ui-react';

export default function CharactersList() {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const filterParams = Object.entries(filters)
      .filter(([_, value]) => value && value !== 'all')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const url = `https://rickandmortyapi.com/api/character/?page=${page}${filterParams ? `&${filterParams}` : ''}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setCharacters(data.results || []);
        setTotalPages(data.info?.pages || 1);
      })
      .catch(error => console.error("Error fetching characters:", error));
  }, [page, filters]);

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
          <Button 
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