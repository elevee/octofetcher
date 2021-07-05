import {useState} from 'react';
import RepositoriesTable from './RepositoriesTable';
import sampleResponse from './sampleResponse';

// function handleChange(e) {
//     e.preventDefault();
//     // const queryString = 'q=' + encodeURIComponent('GitHub Octocat in:readme user:defunkt');
//     console.log('response:', response);

//     const result = await response.json();
//     setResults(result);
//     return result;
// }

const handleSubmit = (query, setResults) => async (e) => {
    e.preventDefault();
    // const queryString = 'q=' + encodeURIComponent('GitHub Octocat in:readme user:defunkt');

    console.log('query is', query);
    // const response = await fetch('https://api.github.com/search/repositories?q=demo');
    // console.log('response:', response);

    // const result = await response.json();
    const result = sampleResponse;
    setResults(result);
    return result;
}

const Home = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({
        items: []
    });
    console.log('query:', query);
    console.log('results:', results);

    return (
        <div>
            <form onSubmit={handleSubmit(query, setResults)}>
                <input name='query' onChange={(e) => setQuery(e.target.value)} value={query} />
                <input type={'submit'} />
            </form>
            <section className='results'>
                <RepositoriesTable results={results} />
            </section>
        </div>
    );
}

export default Home;