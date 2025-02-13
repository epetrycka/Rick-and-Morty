import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import Navbar from './components/Navbar';
import Main from './routes/main';
import CharactersList from './routes/CharactersList';
import CharacterInfo from './routes/CharacterInfo';
import '@testing-library/jest-dom';

jest.mock('./components/Navbar', () => jest.fn(() => <nav data-testid="navbar">Navbar</nav>));
jest.mock('./routes/main', () => jest.fn(() => <div data-testid="main-page">Main Page</div>));
jest.mock('./routes/CharactersList', () => jest.fn(() => <div data-testid="characters-list">Characters List</div>));
jest.mock('./routes/CharacterInfo', () => jest.fn(() => <div data-testid="character-info">Character Info</div>));

describe('App Component', () => {
  test('renders Navbar', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  test('renders Main page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  test('renders CharactersList when navigating to /characters-list', () => {
    render(
      <MemoryRouter initialEntries={['/characters-list']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('characters-list')).toBeInTheDocument();
  });

  test('renders CharacterInfo when navigating to /character-info', () => {
    render(
      <MemoryRouter initialEntries={['/character-info']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('character-info')).toBeInTheDocument();
  });
});
