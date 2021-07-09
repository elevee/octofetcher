import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Repository from './Index';

const recordNotFound = {
  "message": "Not Found",
  "documentation_url": "https://docs.github.com/rest/reference/repos#get-a-repository"
};

describe('Repository Detail Page', () => {
  test('should error if no such repository exists', () => {
    render(
      <MemoryRouter>
        <Repository 
          detailRecordOverride={recordNotFound} />
      </MemoryRouter>
    );

    const linkElement = screen.getByText(/No repository found with this ID/i);
    expect(linkElement).toBeInTheDocument();
  });
});
