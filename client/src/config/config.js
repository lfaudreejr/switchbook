const isDev = window.location.port.indexOf('8080') > -1;
const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};

const BASE = isDev ? 'http://localhost:8080/' : '/';

const hosting = {
  BASE_URI: getHost(),
  BASE_API: BASE
};

export const config = {
  domain: 'lfaudreejr.auth0.com',
  clientID: 'os8IKF89PCsgzlwWTWZtsKyMUhjCNJ1E',
  redirectUri: `${hosting.BASE_URI}/callback`,
  audience: 'https://switchbook.herokuapp.com/auth',
  responseType: 'token id_token',
  scope: 'openid profile'
};
