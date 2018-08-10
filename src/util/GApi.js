export const createScript = () => {
  const script = document.createElement('script');
  const body = document.getElementsByTagName('body')[0];
  return new Promise((resolve, reject) => {
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', (e) => reject(e));
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMlS_JKGTxELjn67oqkgxflMrnFgE_XoY&v=3.33&libraries=places";
    body.appendChild(script);
  })
}