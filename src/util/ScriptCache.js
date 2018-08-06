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
