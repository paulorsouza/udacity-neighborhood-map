/** Idea taken from this gist
https://gist.githubusercontent.com/auser/1d55aa3897f15d17caf21dc39b85b663/raw/2dc3366af5a4afbd15b87b08936c02fe2e6beae2/GoogleApi.js
*/

const makeUrl = (options) => {
  const params = {
    key: 'AIzaSyBMlS_JKGTxELjn67oqkgxflMrnFgE_XoY',
    libraries: (options.libraries || []).join(','),
    client: options.client,
    v: '3.33'
  };
  const paramStr = Object.keys(params)
    .filter(k => !!params[k])
    .map(k => `${k}=${params[k]}`).join('&');
  return `https://maps.googleapis.com/maps/api/js?${paramStr}`;
};

const defaultUrl = 'https://maps.googleapis.com/maps/api/js';

export { makeUrl, defaultUrl };
