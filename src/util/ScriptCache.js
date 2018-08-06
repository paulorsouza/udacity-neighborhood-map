/** Idea taken from this gist
https://gist.githubusercontent.com/auser/1d55aa3897f15d17caf21dc39b85b663/raw/2dc3366af5a4afbd15b87b08936c02fe2e6beae2/ScriptCache.js
*/

import Cache from './Cache';

export default class ScriptCaches {
  scriptMap = new Map();

  scripts = (scripts) => {
    const caches = {};
    const cache = new Cache(this.scriptMap);
    Object.keys(scripts).forEach((key) => {
      const script = scripts[key];
      const tag = this.scriptMap.has(key)
        ? this.scriptMap.get(key).tag
        : cache.scriptTag(key, script);

      caches[key] = {
        tag,
        onLoad: cache.onLoad(key),
      };
    });
    return caches;
  }
}
