import React, { useState, useEffect } from 'react';
import { Button, Select, Label } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';

const filterOptions = [
  { key: 'status', text: 'Status', value: 'status' },
  { key: 'species', text: 'Species', value: 'species' },
  { key: 'gender', text: 'Gender', value: 'gender' },
];

const valueOptions = {
  status: [
    { key: 'alive', text: 'Alive', value: 'alive' },
    { key: 'dead', text: 'Dead', value: 'dead' },
    { key: 'unknown', text: 'Unknown', value: 'unknown' },
  ],
  gender: [
    { key: 'female', text: 'Female', value: 'female' },
    { key: 'male', text: 'Male', value: 'male' },
    { key: 'genderless', text: 'Genderless', value: 'genderless' },
    { key: 'unknown', text: 'Unknown', value: 'unknown' },
  ],
  species: [
    { key: 'human', text: 'Human', value: 'human' },
    { key: 'alien', text: 'Alien', value: 'alien' },
    { key: 'humanoid', text: 'Humanoid', value: 'humanoid' },
    { key: 'robot', text: 'Robot', value: 'robot' },
    { key: 'animal', text: 'Animal', value: 'animal' },
    { key: 'mythological', text: 'Mythological Creature', value: 'mythological creature' },
    { key: 'unknown', text: 'Unknown', value: 'unknown' },
  ],
};

export default function FilterBar({ onFilter }) {
  const location = useLocation();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filtersFromUrl = {};
    params.forEach((value, key) => {
      if(key!='page'){
        filtersFromUrl[key] = value;
      }
    });

    setActiveFilters(filtersFromUrl);
  }, [location.search]);

  const handleFilterChange = (e, { value }) => {
    setSelectedFilter(value);
    setSelectedValue(null);
  };

  const handleValueChange = (e, { value }) => {
    setSelectedValue(value);
  };

  const applyFilter = () => {
    if (selectedFilter && selectedValue) {
      const newFilters = { ...activeFilters, [selectedFilter]: selectedValue };
      setActiveFilters(newFilters);
      onFilter(selectedFilter, selectedValue);
    }
  };

  const removeFilter = (key) => {
    const updatedFilters = { ...activeFilters };
    delete updatedFilters[key];
    setActiveFilters(updatedFilters);
    onFilter(key, 'all');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap',
      alignItems: 'center', 
      justifyContent: 'space-between', 
      gap: '0.5rem'
    }}>
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        flexWrap: 'wrap' 
      }}>

        {Object.entries(activeFilters).map(([key, value]) => (
          <Label key={key} color='blue'>
            {key}: {value}
            <Button circular compact icon='close'
              role='button'
              aria-label='close'
              size='mini'
              style={{ marginLeft: '0.5rem' }}
              onClick={() => removeFilter(key)}
            />
          </Label>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Select 
          placeholder="Filter by..." 
          options={filterOptions} 
          onChange={handleFilterChange} 
          style={{ borderRadius: '5px' }}
        />
        
        <Select 
          placeholder="Select value..." 
          options={selectedFilter ? valueOptions[selectedFilter] : []} 
          onChange={handleValueChange} 
          disabled={!selectedFilter} 
          style={{ borderRadius: '5px' }}
        />

        <Button role='button'
          type="submit" 
          disabled={!selectedFilter || !selectedValue} 
          onClick={applyFilter}
          style={{ borderRadius: '5px' }}
        >
          Filter
        </Button>
      </div>
    </div>
  );
}
