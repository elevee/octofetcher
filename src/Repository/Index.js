import {Link, useParams} from 'react-router-dom';

import styled from 'styled-components';

const RepositoryStyles = styled.div`
  section {
    background: green;
  }
  
`

const Repository = ({results}) => {
    const {id} = useParams();
    console.log(id);
    console.log(results);

    let record;
    if(results.items.length) {
        record = results.items.filter((item) => item.id === parseInt(id))[0];
    } else { // call detail endpoint

    }

    console.log('record:', record);
    if (!record){
        return (
            <div>
                <h3>No repository found with this ID</h3>
                <h6>please go back and try your search again.</h6>
            </div>
        )
    }

    const {
        language,
        name,
        owner: {
            avatar_url,
            login,
        },
        stargazers_count,
    } = record;

    return (
        <RepositoryStyles>
            <header>
                <Link to={'/'} >
                    <button>Back</button>
                </Link>
                Repository Detail Page!
                
            </header>
            <section>
                <img src={avatar_url} alt={`${name} avatar`} />
                <h1>{name}</h1>
                <h1>{stargazers_count}</h1>
                <h1>{language}</h1>
                <h1>{login}</h1>
                

            </section>
        </RepositoryStyles>
    );
}

export default Repository;