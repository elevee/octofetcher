import { render, screen } from '@testing-library/react';
import App from './App';

test('sample test', () => {
  render(<App />);
  const linkElement = screen.getByText(/sample test/i);
  expect(linkElement).toBeInTheDocument();
});
