import React from 'react';
import { render, screen } from '@testing-library/react';
import Uniswap from './pages/Swap';

test('renders learn react link', () => {
  render(<Uniswap />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
