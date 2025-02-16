import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharactersList from '../CharactersList';
import '@testing-library/jest-dom';

global.fetch = jest.fn();

const mockCharacters = {
  info: { pages: 2 },
  results: [
    { id: 1, name: 'Rick Sanchez', image: 'rick.png' },
    { id: 2, name: 'Morty Smith', image: 'morty.png' },
  ],
};

const mockCharactersPage = {
  info: { pages: 2 },
  results: [
    { id: 3, name: 'Summer Smith', image: 'summer.png' },
    { id: 4, name: 'Beth Smith', image: 'beth.png' },
  ],
};

describe('CharactersList component', () => {
  beforeEach(() => {
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCharacters),
    });
  });

  afterEach(() => {
    fetch.mockClear();
  });

  test('renders characters correctly', async () => {
    render(
        <MemoryRouter>
          <CharactersList />
        </MemoryRouter>
      );
  
    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    });
  });

  test('filters characters when a filter is applied', async () => {
    render(
      <MemoryRouter>
        <CharactersList />
      </MemoryRouter>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByText('Filter'));
    
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
  });

  test('pagination works correctly', async () => {
    fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockCharacters),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockCharactersPage),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockCharactersPage),
      });
  
    render(
      <MemoryRouter>
        <CharactersList />
      </MemoryRouter>
    );
  
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  
    const nextButton = await screen.findByLabelText(/next page/i);
    fireEvent.click(nextButton);
  
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));
  
    expect(await screen.findByText(/Summer Smith/i)).toBeInTheDocument();
  });  

  test('prefetches the next page', async () => {
    render(
      <MemoryRouter>
        <CharactersList />
      </MemoryRouter>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
  });
});