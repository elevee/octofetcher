import {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {isEmpty, pickBy} from 'lodash';
import {callRepositories} from 'api/Api';
import styled from 'styled-components';

//parses id query string if present
const useQuery = () => new URLSearchParams(useLocation().search);

export const cleanedDataToSubmit = (params) => { //so we're not passing falsey search params
    const isTruthyString = (value) => typeof(value) === 'string' && value.trim().length > 0;
    return pickBy(params, (value) => isTruthyString(value));
}

export const urlBuilder = (params) => {
    if(isEmpty(params)) return null;

    const cleanedSubmitData = cleanedDataToSubmit(params);
    const baseUrl = 'https://api.github.com/search/repositories?';
    
    return baseUrl + new URLSearchParams(cleanedSubmitData);
}

const handleSubmit = ({
    dataToSubmit, 
    setIsLoading,
    setResults
}) => async (e) => {
    if (e) e.preventDefault();

    const url = urlBuilder(dataToSubmit);
    console.log('url will be', url);
    callRepositories({setIsLoading, setResults, url});
}

const SearchStyles = styled.aside`
    // grid-column: 1 / 2;
    // grid-row: 1 / 2;
    padding: 20px 10px;

    .search {
        width: 200px;
        margin: 0 auto;
    }

    label {
        display: block;
        margin: 0px;
        text-align: left;
        font-weight: bold;
    }

    input[type='submit'] {
        margin-top: 10px;
    }
`

const Search = ({isLoading, results, setIsLoading, setResults}) => {
    const queryStrings = useQuery();
    const urlQuery = queryStrings.get('q') ? encodeURIComponent(queryStrings.get('q')) : null;
    const [query, setQuery] = useState(urlQuery ? urlQuery : '');
    const [sort, setSort] = useState('');
    
    const isDirectionalSort = sort.includes('_');

    const dataToSubmit = {
        q: query, 
        sort: isDirectionalSort ? sort.split('_')[0] : sort,
        order: isDirectionalSort ? sort.split('_')[1] : '',
    }
    console.log('query:', query);
    console.log('sort:', sort);
    console.log('results:', results);
    console.log('dataToSubmit:', dataToSubmit);
    //Todo: optimize callbacks to useMemo
    //Todo: Accessibility

    useEffect(() => { 
        if(urlQuery?.length > 0){ //submit automatically if url query param
            handleSubmit({dataToSubmit, setIsLoading, setResults})();
        }
    }, [])

    return (
        <SearchStyles>
            <aside>
                <div className='search'>
                    <form onSubmit={handleSubmit({dataToSubmit, setIsLoading, setResults})}>
                        <label htmlFor={'query'}>
                            Query:
                        </label>
                        <input 
                            autoFocus
                            name='query' 
                            onChange={(e) => setQuery(e.target.value)} 
                            placeholder={'Type query'}
                            value={query} />
                        <label htmlFor={'sort'}>
                            Sort:
                        </label>
                        <select 
                            name='sort' 
                            onChange={(e) => setSort(e.target.value)} 
                            value={sort}>
                                <option value=''>Default (Best Match)</option> 
                                <option value='stars_asc'>Stars ⬆️</option> 
                                <option value='stars_desc'>Stars ⬇️</option> 
                        </select>
                        <input type={'submit'} disabled={isLoading} />
                    </form>
                </div>
            </aside>
        </SearchStyles>
    );
}

export default Search;