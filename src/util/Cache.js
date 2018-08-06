export default class Cache {
  constructor(scriptMap) {
    this.scriptMap = scriptMap;
  }

  onLoad = (key) => {
    return (callback) => {
      let registered = true;
      const unregister = () => {
        registered = false;
      };

      const stored = this.scriptMap.get(key);
      if (stored) {
        stored.promise.then(() => {
          if (registered) {
            if (stored.error) callback(stored.error);
            else callback(null, stored);
          }
          return stored;
        });
      }
      return unregister;
    };
  };

  scriptTag = (key, src) => {
    if (!this.scriptMap.has(key)) {
      const tag = document.createElement('script');
      const promise = new Promise((resolve, reject) => {
        const body = document.getElementsByTagName('body')[0];
        tag.type = 'text/javascript';
        tag.async = false;
        const handleResult = (state) => {
          return (event) => {
            const stored = this.scriptMap.get(key);
            if (state === 'loaded') {
              stored.resolved = true;
              resolve(src);
            } else if (state === 'error') {
              stored.errored = true;
              reject(event);
            }
            stored.loaded = true;
          };
        };
        tag.onload = handleResult('loaded');
        tag.onerror = handleResult('error');
        tag.onreadystatechange = () => {
          handleResult(tag.readyState);
        };
        tag.addEventListener('load', tag.onload);
        tag.addEventListener('error', tag.onerror);
        tag.src = src;
        body.appendChild(tag);
        return tag;
      });
      const initialState = {
        loaded: false,
        error: false,
        promise,
        tag
      };
      this.scriptMap.set(key, initialState);
    }
    return this.scriptMap.get(key);
  };
}
