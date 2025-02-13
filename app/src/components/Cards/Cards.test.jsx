import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cards from './index';
import '@testing-library/jest-dom';

const mockCharacters = [
  { id: 1, name: 'Rick Sanchez' },
  { id: 2, name: 'Morty Smith' },
  { id: 3, name: 'Summer Smith' },
  { id: 4, name: 'Beth Smith' },
  { id: 5, name: 'Jerry Smith' },
  { id: 6, name: 'Birdperson' },
];

test('renders without crashing when no characters are provided', () => {
  render(<Cards characters={[]} />);
  expect(screen.getByRole('grid')).toBeInTheDocument();
});

test('renders correct number of characters', () => {
  render(
    <MemoryRouter>
      <Cards characters={mockCharacters} />
    </MemoryRouter>
  );

  mockCharacters.forEach(character => {
    expect(screen.getByText(character.name)).toBeInTheDocument();
  });
});

test('renders correct number of rows and columns', () => {
  render(
    <MemoryRouter>
      <Cards characters={mockCharacters} />
    </MemoryRouter>);
  
  expect(screen.getAllByRole('row')).toHaveLength(4);
  expect(screen.getAllByRole('gridcell')).toHaveLength(mockCharacters.length);
});
