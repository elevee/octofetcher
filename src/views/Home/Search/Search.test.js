import { cleanedDataToSubmit, urlBuilder } from './Index';

const baseUrl = 'https://api.github.com/search/repositories';

describe('UrlBuilder', () => {
  test('should return null if empty', () => {
    const result = urlBuilder({});
    expect(result).toBe(null);
  });

  test('should handle query only', () => {
    const query = 'demo';
    const result = urlBuilder({
      q: query,
      sort: '',
    });
    expect(result).toBe(`${baseUrl}?q=${query}`);
  });

  test('should handle query and sort', () => {
    const query = 'demo';
    const sort = 'star';
    const result = urlBuilder({
      q: query,
      sort,
    });
    expect(result).toBe(`${baseUrl}?q=${query}&sort=${sort}`);
  });

});

describe('cleanDataToSubmit', () => {
  test('should clean falsey params', () => {
    const dirtyObject = {
      q: 'demo',
      sort: '',
    }
    expect(cleanedDataToSubmit(dirtyObject)).toStrictEqual({
      q: 'demo'
    });
  });
});
