import ScriptCache from '../../util/ScriptCache';

describe('ScriptCache', () => {
  const scriptCache = new ScriptCache();
  beforeEach(() => {
    scriptCache.scripts({ example: 'http://example.com' });
  });

  it('adds a script tag', () => {
    expect(scriptCache.scriptMap.has('example')).toBe(true);
  });

  it('only adds a single script', () => {
    scriptCache.scripts({ example: 'http://example.com' });
    scriptCache.scripts({ example: 'http://example.com' });
    expect(scriptCache.scriptMap.has('example')).toBe(true);
    const scripts = global.document.querySelectorAll('script');
    expect(scripts).toHaveLength(1);
    expect(scripts[0].src).toEqual('http://example.com/');
  });

  it('add more scripts', () => {
    scriptCache.scripts({ example2: 'http://example2.com' });
    scriptCache.scripts({ example3: 'http://example3.com' });
    scriptCache.scripts({ example4: 'http://example4.com' });
    expect(scriptCache.scriptMap.has('example')).toBe(true);
    expect(scriptCache.scriptMap.has('example2')).toBe(true);
    expect(scriptCache.scriptMap.has('example3')).toBe(true);
    expect(scriptCache.scriptMap.has('example4')).toBe(true);
    const scripts = global.document.querySelectorAll('script');
    expect(scripts).toHaveLength(4);
  });
});
