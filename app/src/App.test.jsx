import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom';

jest.mock('./components/Navbar', () => jest.fn(() => <nav data-testid="navbar">Navbar</nav>));
jest.mock('./routes/main', () => jest.fn(() => <div data-testid="main-page">Main Page</div>));
jest.mock('./routes/CharactersList', () => jest.fn(() => <div data-testid="characters-list">Characters List</div>));
jest.mock('./routes/CharacterInfo', () => jest.fn(() => <div data-testid="character-info">Character Info</div>));

describe('App Component', () => {
  test('renders Navbar', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  test('renders Main page by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  test('renders CharactersList when navigating to /characters-list', () => {
    window.history.pushState({}, 'Characters List', '/characters-list');

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('characters-list')).toBeInTheDocument();
  });

  test('renders CharacterInfo when navigating to /character-info/:id', () => {
    window.history.pushState({}, 'Character Info', '/character-info/1');

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('character-info')).toBeInTheDocument();
  });
});
