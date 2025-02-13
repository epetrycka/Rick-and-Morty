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
    render(
      <MemoryRouter>
        <CharactersList />
      </MemoryRouter>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const nextButton = screen.getByLabelText(/arrow right/i);

    fireEvent.click(nextButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
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
