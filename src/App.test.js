import { render, screen } from '@testing-library/react';
import App from './App';

test('App renders', () => {
  render(<App />);
  const linkElement = screen.getByText(/OctoFetcher/i);
  expect(linkElement).toBeInTheDocument();
});
