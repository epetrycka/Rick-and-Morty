import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterCard from './index';
import '@testing-library/jest-dom';

const mockCharacter = {
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
};

describe('CharacterCard component', () => {
  test('renders character information correctly', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Alive - Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: Male/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Rick Sanchez/i })).toHaveAttribute('src', mockCharacter.image);
  });

  test('renders nothing when character is null', () => {
    const { container } = render(
      <MemoryRouter>
        <CharacterCard character={null} />
      </MemoryRouter>
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('renders a link to character-info page', () => {
    const mockCharacter = { id: 1, name: 'Rick Sanchez' };
  
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>
    );
  
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/character-info/${mockCharacter.id}`);
  });
});
