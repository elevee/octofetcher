import { render, screen } from '@testing-library/react';
import Home from './Index';
import RepositoriesTable from './RepositoriesTable';
import sampleResponse from './sampleResponse';

xtest('Renders Table to page', () => {
  render(
    <Home>
      <RepositoriesTable results={sampleResponse}/>
    </Home>
  );
  const linkElement = screen.getByText(/RepositoriesTable/i);
  expect(linkElement).toBeInTheDocument();
});

// test('Renders Table to page', () => {
//   render(<RepositoriesTable response={sampleResponse} />);
//   const linkElement = screen.getByText(/RepositoriesTable/i);
//   expect(linkElement).toBeInTheDocument();
// });

