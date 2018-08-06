/** From https://gist.github.com/auser/1d55aa3897f15d17caf21dc39b85b663
The backbone of this method which asynchronously loads JavaScript <script> tags on a page.
It will only load a single <script> tag on a page per-script tag declaration.
If it's already loaded on a page, it calls the callback from the onLoad event immediately.
*/
const scriptMap = new Map();

export default () => {
  return (scripts) => {
    const Cache = {};

    Cache.onLoad = (key) => {
      return (callback) => {
        let registered = true;
        const unregister = () => {
          registered = false;
        };

        const stored = scriptMap.get(key);
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

    Cache.scriptTag = (key, src) => {
      if (!scriptMap.has(key)) {
        const tag = document.createElement('script');
        const promise = new Promise((resolve, reject) => {
          const body = document.getElementsByTagName('body')[0];
          tag.type = 'text/javascript';
          tag.async = false;
          const handleResult = (state) => {
            return (event) => {
              const stored = scriptMap.get(key);
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
        scriptMap.set(key, initialState);
      }
      return scriptMap.get(key);
    };
    Object.keys(scripts).forEach((key) => {
      const script = scripts[key];

      const tag = window.scriptMap.has(key)
        ? window.scriptMap.get(key).tag
        : Cache.scriptTag(key, script);

      Cache[key] = {
        tag,
        onLoad: Cache.onLoad(key),
      };
    });
    return Cache;
  };
};
