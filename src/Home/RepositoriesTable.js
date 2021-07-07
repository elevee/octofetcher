import React from 'react';
import {Link} from 'react-router-dom';

import styled from 'styled-components';

const TableStyles = styled.div`
  align-items: flex-start;
  
`

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

const RepositoriesTable = ({filter, results}) => {
    const {items} = results;
    if (!items || items.length === 0) {
        return (
            <div>
                <h2>Search a Repo name to get started!</h2>
            </div>
        )
    }

    return (
        <TableStyles>
            <h3>RepositoriesTable</h3>
            <table>
                <thead>
                    <tr>
                        <th>Repository</th>
                        <th>Stars</th>
                        <th>Language</th>
                    </tr>
                </thead>
                <tbody>
                    {items
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
            </table>
        </TableStyles>
    );
}

export default RepositoriesTable;