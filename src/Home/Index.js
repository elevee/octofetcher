import {useState} from 'react';
import Filter from './Filter';
import Search from './Search';
import RepositoriesTable from './RepositoriesTable';
import styled from 'styled-components';

const Container = styled.div`
  height: calc(100vh - 10px);
  display: grid;
  grid-template-columns: minmax(10px, 1fr), minmax(10px, 4fr);
//   grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//   grid-template-rows: min-content min-content 1fr min-content;
  gap: 5px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 4fr;
    > * {
      grid-column: 1 / -1 !important;
      grid-row: auto !important;
    }
  }

  aside {
    grid-column: 1 / 2;
    // grid-row: 1 / 2;
    background: #e1bee7;
  }

  section {
    grid-column: 2 / 5;
    background: #dcedc8;
    display: grid;
    grid-template-rows: 1fr 8fr;
  }


`

const Home = ({results, setResults}) => {
    const [filter, setFilter] = useState(null);

    return (
        <Container>
            <Search 
                results={results}
                setResults={setResults} />
            <section className='results'>
                {/* <Suspense fallback={<h1>Loading results...</h1>}> */}
                {results.items.length > 0 && 
                    <Filter 
                      filter={filter}
                      setFilter={setFilter}
                      results={results}/>}
                <RepositoriesTable 
                  filter={filter}
                  results={results} />
                {/* </Suspense> */}
            </section>
        </Container>
    );
}

export default Home;