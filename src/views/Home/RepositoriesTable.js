import React from 'react';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Spinner from 'images/largeSpinner.gif';
import styled from 'styled-components';

const TableStyles = styled.div`
    // align-items: center;
    display: grid;
    
    table {
      // grid-template-rows: 1fr 4fr;
    }

    thead tr, tbody tr {
        display: grid;
        grid-template-columns: repeat(3, minmax(150px, 1.33fr));
    }
`;

const RepositoryItem = ({data}) => {
    const {id, language, name, stargazers_count} = data;

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
    const {items, status} = results;

    if(isLoading){
        return (
        <div>
            <img src={Spinner} alt='loading' />
        </div>);
    }

    if (!isLoading && status === 'initialized') {
        return (
            <div>
                <h2>Search a Repo name to get started!</h2>
            </div>
        );
    }

    if (!isLoading && (!items || items.length === 0)) {
        return (
            <div>
                <h2>No results found!</h2>
                <p>Give it another try.</p>
            </div>
        )
    }


    return (
        <TableStyles>
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
                        if(filter){
                          console.log('filt=', filter);
                          if(filter === 'None') return !item.language
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
            </Table>
        </TableStyles>
    );
}

export default RepositoriesTable;