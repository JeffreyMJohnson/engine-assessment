import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the header', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  it('renders the correct title', () => {
    render(<Header />);
    const titleElement = screen.getByText(/Content Feed/i);
    expect(titleElement).toBeInTheDocument();
  });
});
