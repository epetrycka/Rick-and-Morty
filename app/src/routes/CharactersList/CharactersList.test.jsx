import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharactersList from '../CharactersList';

global.fetch = jest.fn();

describe('CharactersList Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders CharactersList and fetches characters', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ results: [{ id: 1, name: 'Rick Sanchez' }], info: { pages: 2 } })
    });

    render(
      <MemoryRouter>
        <CharactersList />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Rick Sanchez')).toBeInTheDocument());
  });

  test('handles pagination correctly', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ results: [{ id: 1, name: 'Rick Sanchez' }], info: { pages: 2 } })
    });

    render(
      <MemoryRouter>
        <CharactersList />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Rick Sanchez')).toBeInTheDocument());

    const nextButton = screen.getByLabelText('next page');
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('page=2'));
    });
  });

  test('applies filters correctly', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ results: [{ id: 1, name: 'Rick Sanchez' }], info: { pages: 2 } })
    });
  
    render(
      <MemoryRouter>
        <CharactersList />
      </MemoryRouter>
    );
  
    await waitFor(() => expect(screen.getByText('Rick Sanchez')).toBeInTheDocument());
  
    fetch.mockResolvedValueOnce({
      json: async () => ({ results: [{ id: 2, name: 'Morty Smith' }], info: { pages: 2 } })
    });
  
    fireEvent.click(screen.getByText('Filter by...')); 

    fireEvent.click(screen.getByText('Species'));
  
    fireEvent.click(screen.getByText('Select value...')); 
    fireEvent.click(screen.getByText('Human'));
  
    fireEvent.click(screen.getByRole('button', { name: /filter/i }));
  
    await waitFor(() => expect(screen.getByText('Morty Smith')).toBeInTheDocument());
  });  
});