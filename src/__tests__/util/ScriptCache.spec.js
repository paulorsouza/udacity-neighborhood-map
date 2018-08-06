import ScriptCache from '../../util/ScriptCache';

const createCache = (obj) => {
  const cache = ScriptCache(obj);
  return cache;
};

test('Cache', () => {
  let cache;

  beforeEach(() => {
    cache = createCache({
      example: 'http://example.com'
    });
  });

  afterEach(() => {
    cache.scriptTag.restore();
  });

  it('adds a script tag', () => {
    expect(global.window.scriptMap.has('example')).to.be.ok;
  });

  it('only adds a single script', () => {
    createCache({
      example: 'http://example.com'
    });
    createCache({
      example: 'http://example.com'
    });

    expect(global.window.scriptMap.has('example')).to.be.ok;
    const scripts = global.document.querySelectorAll('script');
    expect(scripts.length).to.equal(1);
    expect(scripts[0].src).to.equal('http://example.com/');
  });
});
