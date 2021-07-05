import React from 'react';

const RepositoryItem = ({data}) => {
    const {language, name, stargazers_count} = data;

    return (
        <tr>
            <td>{name}</td>
            <td>{stargazers_count}</td>
            <td>{language ? language : '-'}</td>
        </tr>
    );
}

const RepositoriesTable = ({results}) => {
    const {items} = results;
    if (!items || items.length === 0) {
        return (
            <div>
                <h2>Type a Repo name to get started!</h2>
            </div>
        )
    }

    return (
        <div>
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
                    {items.map((item, i) => <RepositoryItem key={`${i}_${Date.now()}`} data={item} />)}
                </tbody>
            </table>
        </div>
    );
}

export default RepositoriesTable;