import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoTable from '../InfoTable';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';


const mockCharacter = {
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  type: '',
  origin: { name: 'Earth (C-137)' },
  location: { name: 'Citadel of Ricks' },
};

describe('InfoTable component', () => {
  test('renders without crashing', () => {
    render(
        <MemoryRouter>
            <InfoTable character={mockCharacter} />
        </MemoryRouter>);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  test('displays character information correctly', () => {
    render(
        <MemoryRouter>
            <InfoTable character={mockCharacter} />
        </MemoryRouter>);
    
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();

    expect(screen.getByText('Species')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();

    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();

    expect(screen.getByText('Origin')).toBeInTheDocument();
    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();

    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
  });

  test('displays "-" when type is empty', () => {
    render(
        <MemoryRouter>
            <InfoTable character={mockCharacter} />
        </MemoryRouter>);

    expect(screen.getByText('-')).toBeInTheDocument();
  });

  test('handles missing character data gracefully', () => {
    const incompleteCharacter = {
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: {},
      location: {},
    };

    render(
        <MemoryRouter>
            <InfoTable character={incompleteCharacter} />
        </MemoryRouter>);
    
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
