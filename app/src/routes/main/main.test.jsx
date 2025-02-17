import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Main from '.';

jest.mock('../CharactersList', () => jest.fn(() => <div data-testid="characters-list">CharactersList</div>));

describe('Main component', () => {
  test('renders CharactersList component', () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByTestId('characters-list')).toBeInTheDocument();
  });
});
