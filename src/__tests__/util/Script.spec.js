import { makeUrl, defaultUrl } from '../../util/Script';

describe('GoogleApi', () => {
  it('loads a url from google api', () => {
    expect(makeUrl({})).toContain(defaultUrl);
  });

  it('loads libraries', () => {
    const url = makeUrl({
      libraries: ['places', 'people', 'animals']
    });
    expect(url).toContain('places,people,animals');
  });
});
