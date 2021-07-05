import { render, screen } from '@testing-library/react';
import RepositoriesTable from './RepositoriesTable';
import sampleResponse from './sampleResponse';

test('Renders Table to page', () => {
  render(<RepositoriesTable />);
  const linkElement = screen.getByText(/RepositoriesTable/i);
  expect(linkElement).toBeInTheDocument();
});

// test('Renders Table to page', () => {
//   render(<RepositoriesTable response={sampleResponse} />);
//   const linkElement = screen.getByText(/RepositoriesTable/i);
//   expect(linkElement).toBeInTheDocument();
// });
