import React, { useState } from 'react';
import { Input, Button, Select } from 'semantic-ui-react';

const filterOptions = [
  { key: 'status', text: 'Status', value: 'status' },
  { key: 'species', text: 'Species', value: 'species' },
  { key: 'gender', text: 'Gender', value: 'gender' },
];

const valueOptions = {
  status: [
    { key: 'all', text: 'All', value: 'all' },
    { key: 'alive', text: 'Alive', value: 'alive' },
    { key: 'dead', text: 'Dead', value: 'dead' },
    { key: 'unknown', text: 'Unknown', value: 'unknown' },
  ],
  gender: [
    { key: 'all', text: 'All', value: 'all' },
    { key: 'female', text: 'Female', value: 'female' },
    { key: 'male', text: 'Male', value: 'male' },
    { key: 'genderless', text: 'Genderless', value: 'genderless' },
    { key: 'unknown', text: 'Unknown', value: 'unknown' },
  ],
  species: [
    { key: 'all', text: 'All', value: 'all' },
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
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleFilterChange = (e, { value }) => {
    setSelectedFilter(value);
    setSelectedValue(null);
  };

  const handleValueChange = (e, { value }) => {
    setSelectedValue(value);
  };

  return (
    <Input action style={{ alignSelf: 'end', display: 'flex', gap: '0.5rem' }}>
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

      <Button 
        type="submit" 
        disabled={!selectedFilter || !selectedValue} 
        onClick={() => onFilter(selectedFilter, selectedValue)}
        style={{ 
          borderRadius: '5px',
        }}
      >
        Filter
      </Button>
    </Input>
  );
}
