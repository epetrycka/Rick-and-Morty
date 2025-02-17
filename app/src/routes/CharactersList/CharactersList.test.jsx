import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharactersList from '../CharactersList';

global.fetch = jest.fn();

describe('CharactersList Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    cleanup();
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
});