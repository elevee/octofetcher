import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import RepositoriesTable from './Index';
import sampleListResponse from 'api/sampleListResponse';

test('Renders Table to page', async () => {
  render(
    <MemoryRouter>
      <RepositoriesTable results={sampleListResponse} />
    </MemoryRouter>
  );

  const linkElement1 = screen.getByText(/Repository/i);
  const linkElement2 = screen.getByText(/Stars/i);
  const linkElement3 = screen.getByText(/Language/i);
  
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
  expect(linkElement3).toBeInTheDocument();

  const items = await screen.getAllByRole('row'); //targeting 'tr's
  expect(items.length).toBeGreaterThan(3);
});

test('Filters results by language', async () => {
  render(
    <MemoryRouter>
      <RepositoriesTable results={sampleListResponse} filter={'PHP'} />
    </MemoryRouter>
  );

  const items = await screen.getAllByRole('row');
  expect(items).toHaveLength(3);
});

test('Renders Error to page if no results items', () => {
  render(
    <MemoryRouter>
      <RepositoriesTable results={{items: []}} />
    </MemoryRouter>
  );
  
  const linkElement = screen.getByText(/No Results Found/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders first time user experience to page on load', () => {
  render(
    <MemoryRouter>
      <RepositoriesTable results={{ items: [], status: 'initialized'}} />
    </MemoryRouter>
  );

  const linkElement = screen.getByText(/Search for a Repo name to the left to get started!/i);
  expect(linkElement).toBeInTheDocument();
});
