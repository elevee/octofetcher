import {useState} from 'react';
import {isEmpty} from 'lodash';
import styled from 'styled-components';

const FilterStyles = styled.div`
  margin: 5px;
  text-align: right;
`;

const Filter = ({filter, results, setFilter}) => {
    console.log('filter: ', filter);
    console.log('filter type: ', typeof filter);
    const languages = {};

    results.items.map((result) => {
        const {language} = result;
        const languageName = language ? language : 'None';

        if(languages[languageName]){
            languages[languageName]++;
        } else {
            languages[languageName] = 1;
        }
    });

    console.log('languages', languages);

    return (
        <FilterStyles>
            <select 
              onChange={(e) => setFilter(e.target.value)}
              value={filter}>
                <option value=''>All Languages</option>
                {!isEmpty(languages) && Object.entries(languages).map((entry, i) => {
                    let [language, count] = entry;
                    return (
                        <option 
                            key={`${i}_${Date.now()}`} 
                            value={language}>
                                {`${language} (${count})`}
                        </option>
                    );
                })}
            </select>
        </FilterStyles>
    );
}

export default Filter;