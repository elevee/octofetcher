import { useState } from 'react';
import Filter from './Filter/Index';
import Search from './Search/Index';
import RepositoriesTable from './RepositoriesTable/Index';
import {Colors} from 'resources/Index';
import styled from 'styled-components';


const Container = styled.div`
  height: calc(100vh - 10px);
  display: grid;
  grid-template-columns: minmax(10px, 1fr), minmax(10px, 4fr);
  gap: 5px;
  
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 5fr;
    > * {
      grid-column: 1 / -1 !important;
      grid-row: auto !important;
    }
  }

  aside {
    grid-column: 1 / 2;
    background-color: ${Colors.PRIMARY};
  }

  section {
    grid-column: 2 / 5;
    background-color: ${Colors.SECONDARY};
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 9fr;
    justify-items: center;
  }

`;

const Home = ({ results, setResults }) => {
  const [filter, setFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container>
      <Search {...{
        isLoading,
        results,
        setIsLoading,
        setResults,
      }} />
      <section className='results'>
        {results?.items?.length > 0 &&
          <Filter
            filter={filter}
            setFilter={setFilter}
            results={results} />}
        <RepositoriesTable
          filter={filter}
          isLoading={isLoading}
          results={results} />
      </section>
    </Container>
  );
}

export default Home;