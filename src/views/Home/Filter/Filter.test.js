import { hashTabler } from './Index';
import sampleListResponse from 'api/sampleListResponse';

describe('Hashtabler', () => {
  test('should return proper hash table of languages and their counts', () => {
    const result = hashTabler(sampleListResponse);
    const expected = {
      "None": 3,
      "PHP": 2,
      "Go": 1,
      "Objective-C": 3,
      "JavaScript": 7,
      "PLpgSQL": 1,
      "Java": 2,
      "Python": 1,
      "HTML": 5,
      "Dart": 2,
      "TypeScript": 1,
      "C": 1,
      "Pug": 1
    };
    expect(result).toStrictEqual(expected);
  });
});
