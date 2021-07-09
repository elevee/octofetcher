import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Spinner from 'images/largeSpinner.gif';
import styled from 'styled-components';

const TableStyles = styled.div`
    display: grid;
    height: 100%;

    thead tr, tbody tr {
        display: grid;
        grid-template-columns: repeat(3, minmax(150px, 1.33fr));
    }

    .empty, .ftux, .loading {
        margin-top: 75px;
    }
`;

const RepositoryItem = ({ data }) => {
  const { id, language, name, stargazers_count } = data;

  return (
    <tr>
      <td><Link to={`/repositories/${id}`}>{name}</Link></td>
      <td>{stargazers_count}</td>
      <td>{language ? language : '-'}</td>
    </tr>
  );
}

const RepositoriesTable = ({
  filter,
  isLoading,
  results,
}) => {
  const { items, status } = results;
  const firstLoad = !isLoading && status === 'initialized';
  const noResults = !isLoading && status !== 'initialized' && (!items || items?.length === 0);
  const resultsAvailable = !isLoading && results?.items?.length > 0;

  return (
    <TableStyles>
      {isLoading && (
        <div className='loading'>
          <img src={Spinner} alt='loading' />
        </div>
      )}

      {firstLoad && (
        <div className='ftux'>
          <h2>Search for a Repo name to the left to get started!</h2>
        </div>
      )}

      {noResults && (
        <div className='empty'>
          <h2>No results found!</h2>
          <p>Give it another try.</p>
        </div>
      )}

      {resultsAvailable &&
        <Table striped borderless hover>
          <thead>
            <tr>
              <th>Repository</th>
              <th>Stars</th>
              <th>Language</th>
            </tr>
          </thead>
          <tbody>
            {items && items
              .filter((item) => {
                if (filter) {
                  if (filter === 'None') return !item.language
                  return item.language === filter;
                }
                return item;
              })
              .map((item, i) =>
                <RepositoryItem
                  key={`${i}_${Date.now()}`}
                  data={item} />
              )}
          </tbody>
        </Table>}
    </TableStyles>
  );
}

export default RepositoriesTable;