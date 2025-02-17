import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import FilterBar from './index';

describe('FilterBar component', () => {
  test('renders without crashing', () => {
    render(
        <MemoryRouter>
            <FilterBar onFilter={jest.fn()} />
        </MemoryRouter>);
    
    expect(screen.getByText('Filter by...')).toBeInTheDocument();
    expect(screen.getByText('Select value...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filter/i })).toBeDisabled();
  });

  test('allows selecting a filter and a value', () => {
    render(
        <MemoryRouter>
            <FilterBar onFilter={jest.fn()} />
        </MemoryRouter>);

    fireEvent.mouseDown(screen.getByText('Filter by...'));
    fireEvent.click(screen.getByText('Status'));

    fireEvent.mouseDown(screen.getByText('Select value...'));
    fireEvent.click(screen.getByText('Alive'));

    expect(screen.getByRole('button', { name: /filter/i })).toBeEnabled();
  });

  test('calls onFilter when applying a filter', () => {
    const onFilterMock = jest.fn();
    render(
        <MemoryRouter>
            <FilterBar onFilter={onFilterMock} />
        </MemoryRouter>);
    
    fireEvent.mouseDown(screen.getByText('Filter by...'));
    fireEvent.click(screen.getByText('Status'));

    fireEvent.mouseDown(screen.getByText('Select value...'));
    fireEvent.click(screen.getByText('Alive'));

    fireEvent.click(screen.getByRole('button', { name: /filter/i }));

    expect(onFilterMock).toHaveBeenCalledWith('status', 'alive');
  });

  test('removes filter when clicking close button', () => {
    const onFilterMock = jest.fn();
    render(
        <MemoryRouter>
            <FilterBar onFilter={onFilterMock} />
        </MemoryRouter>);

    fireEvent.mouseDown(screen.getByText('Filter by...'));
    fireEvent.click(screen.getByText('Status'));

    fireEvent.mouseDown(screen.getByText('Select value...'));
    fireEvent.click(screen.getByText('Alive'));

    fireEvent.click(screen.getByRole('button', { name: /filter/i }));

    expect(screen.getByText('status: alive')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(onFilterMock).toHaveBeenCalledWith('status', 'all');
    expect(screen.queryByText('status: alive')).not.toBeInTheDocument();
  });
});
