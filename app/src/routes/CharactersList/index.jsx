import React, { useEffect, useState } from 'react';
import { Pagination, Button } from 'semantic-ui-react';
import { useLocation, useNavigate } from 'react-router-dom';

import './CharactersList.css';

import FilterBar from '../../components/FilterBar';
import Cards from '../../components/Cards';

export default function CharactersList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = Number(params.get('page')) || 1;
    
    const filtersFromUrl = {};
    params.forEach((value, key) => {
      if (key !== "page") {
        filtersFromUrl[key] = value;
      }
    });

    setPage(pageFromUrl);
    setFilters(filtersFromUrl);
  }, [location.search]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const filterParams = Object.entries(filters)
        .filter(([_, value]) => value && value !== 'all')
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
  
      const url = `https://rickandmortyapi.com/api/character/?page=${page}${filterParams ? `&${filterParams}` : ''}`;
      
      const cachedData = sessionStorage.getItem(url);
      if (cachedData) {
        const { results, totalPages } = JSON.parse(cachedData);
        setCharacters(results);
        setTotalPages(totalPages);
        return;
      }
  
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        if (data.error) {
          setCharacters([]);
          setTotalPages(1);
          return;
        }
  
        sessionStorage.setItem(url, JSON.stringify({
          results: data.results,
          totalPages: data.info?.pages || 1
        }));
  
        setCharacters(data.results || []);
        setTotalPages(data.info?.pages || 1);
  
        const nextPage = page + 1;
        if (nextPage <= (data.info?.pages || 1)) {
          const nextUrl = `https://rickandmortyapi.com/api/character/?page=${nextPage}${filterParams ? `&${filterParams}` : ''}`;
          
          if (!sessionStorage.getItem(nextUrl)) {
            fetch(nextUrl)
              .then(response => response.json())
              .then(nextData => {
                if (nextData.error) return;
  
                sessionStorage.setItem(nextUrl, JSON.stringify({
                  results: nextData.results,
                  totalPages: nextData.info?.pages || 1
                }));
  
              })
              .catch(error => console.error("Błąd przy prefetchowaniu następnej strony:", error));
          }
        }
  
      } catch (error) {
        console.error("Błąd podczas pobierania postaci:", error);
      }
    };
  
    fetchCharacters();
  }, [page, filters]);
  
  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      navigate(`?page=${newPage}${Object.entries(filters).map(([key, value]) => `&${key}=${value}`).join('')}`);
      setPage(newPage);
    }
  };

  const handleFilter = (key, value) => {
    setFilters(prev => {
      const updatedFilters = { ...prev };
      if (value === 'all') {
        delete updatedFilters[key];
      } else {
        updatedFilters[key] = value;
      }

      navigate(`?page=1${Object.entries(updatedFilters).map(([k, v]) => `&${k}=${v}`).join('')}`);
      setPage(1);

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
            onClick={() => handlePageChange(page - 1)}
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
            onClick={() => handlePageChange(page + 1)}
          />
        </div> 
      </div>

      <footer className="section footer">
        <Pagination 
          activePage={page} 
          totalPages={totalPages} 
          onPageChange={(_, { activePage }) => handlePageChange(activePage)}
          size="mini"
        />
      </footer>
    </div>
  );
}
