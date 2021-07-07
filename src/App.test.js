import { render, screen } from '@testing-library/react';
import App from './App';

test('sample test', () => {
  render(<App />);
  const linkElement = screen.getByText(/sample test/i);
  expect(linkElement).toBeInTheDocument();
});

// User navigates to /repositories/no-id
// User navigates to /repositories/id and it fails
// User navigates to /repositories/text