import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import styled from 'styled-components';

export const hashTabler = ({ items }) => {
  return items.reduce((acc, item) => {
    const { language } = item;
    const languageName = language ? language : 'None';

    if (acc[languageName]) {
      acc[languageName]++;
    } else {
      acc[languageName] = 1;
    }
    return acc;
  }, {});
}

const FilterStyles = styled.div`
  margin: 5px;
  text-align: right;

  @media only screen and (max-width: 600px) {
    text-align: center;
    width: 100%;
  }
`;

const Filter = ({ filter, results, setFilter }) => {
  const languages = hashTabler(results);

  useEffect(() => setFilter(null), [results]);

  return (
    <FilterStyles>
      <select
        onChange={(e) => setFilter(e.target.value)}
        value={filter || ''}>
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