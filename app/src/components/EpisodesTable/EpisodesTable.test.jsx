import React from 'react';
import { render, screen } from '@testing-library/react';
import EpisodesTable from './index';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('EpisodesTable component', () => {
  test('renders 51 episodes', () => {
    render(
        <MemoryRouter>
            <EpisodesTable characterEpisodes={[]} />
        </MemoryRouter>);
        
    const episodes = screen.getAllByText(/\d+/);
    expect(episodes).toHaveLength(51);
  });

  test('highlights episodes that the character appeared in', () => {
    render(
        <MemoryRouter>
            <EpisodesTable characterEpisodes={[1, 5, 10]} />  
        </MemoryRouter>); 
    
    
    expect(screen.getByText('1')).toHaveStyle('background-color: #87CEEB');
    expect(screen.getByText('5')).toHaveStyle('background-color: #87CEEB');
    expect(screen.getByText('10')).toHaveStyle('background-color: #87CEEB');
  });

  test('does not highlight episodes not in characterEpisodes', () => {
    render(
        <MemoryRouter>
            <EpisodesTable characterEpisodes={[1, 5, 10]} />
        </MemoryRouter>);
    
    expect(screen.getByText('2')).not.toHaveStyle('background-color: #87CEEB');
    expect(screen.getByText('3')).not.toHaveStyle('background-color: #87CEEB');
  });

  test('handles empty characterEpisodes array correctly', () => {
    render(
        <MemoryRouter>
            <EpisodesTable characterEpisodes={[]} />
        </MemoryRouter>);

    const episodes = screen.getAllByText(/\d+/);
    episodes.forEach((episode) => {
      expect(episode).not.toHaveStyle('background-color: #87CEEB');
    });
  });
});
