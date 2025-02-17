import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';

describe('Navbar component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('displays the logo and user icon', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logo = screen.getByLabelText(/logo/i);
    const favicon = screen.getByLabelText(/favicon/i);

    expect(logo).toBeInTheDocument();
    expect(favicon).toBeInTheDocument();
  });

  test('contains link to characters list', async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const dropdownButton = screen.getByLabelText(/bars/i);
    await userEvent.click(dropdownButton);

    const charactersLink = screen.getByLabelText(/characters/i);
    expect(charactersLink).toBeInTheDocument();
    expect(charactersLink).toHaveAttribute('href', '/characters-list');
  });

  test('contains link to home page', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const homeLink = screen.getByLabelText(/logo/i);
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
