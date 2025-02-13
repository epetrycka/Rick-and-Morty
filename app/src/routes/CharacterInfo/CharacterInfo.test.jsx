import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterInfo from '../CharacterInfo';
import '@testing-library/jest-dom';

const mockCharacter = {
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  type: '',
  origin: { name: 'Earth' },
  location: { name: 'Citadel of Ricks' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'],
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('CharacterInfo component', () => {
  beforeEach(() => {
    const { useLocation } = require('react-router-dom');
    useLocation.mockReturnValue({ state: { character: mockCharacter } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with character data', () => {
    render(
      <MemoryRouter>
        <CharacterInfo />
      </MemoryRouter>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
  });

  test('renders "Brak danych postaci" when character is missing', async () => {
    const { useLocation } = require('react-router-dom');
    useLocation.mockReturnValue({ state: null });

    render(
      <MemoryRouter>
        <CharacterInfo />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Brak danych postaci')).toBeInTheDocument();
    });
  });

  test('toggles episodes visibility when button is clicked', () => {
    render(
      <MemoryRouter>
        <CharacterInfo />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /show episodes/i });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });
});
