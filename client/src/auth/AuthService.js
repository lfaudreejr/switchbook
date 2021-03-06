import auth0 from 'auth0-js';
import EventEmitter from 'eventemitter3';
import router from '../router';
import { config } from '../config/config';

export default class AuthService {
  authenticated = this.isAuthenticated();
  authNotifier = new EventEmitter();
  profile = this.getProfile();

  constructor () {
    this.login = this.login.bind(this);
    this.setSession = this.setSession.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.setProfile = this.setProfile.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  auth0 = new auth0.WebAuth({
    domain: config.domain,
    clientID: config.clientID,
    redirectUri: config.redirectUri,
    audience: config.audience,
    responseType: config.responseType,
    scope: config.scope
  });

  login () {
    this.auth0.authorize();
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.setProfile(authResult);
        router.replace('/home');
      } else if (err) {
        router.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setProfile (authResult) {
    this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
      if (err) console.log(err);
      localStorage.setItem('profile', JSON.stringify(user.nickname));
      this.authNotifier.emit('profileChange', { profile: user.nickname });
    });
  }

  getProfile () {
    return JSON.parse(localStorage.getItem('profile'));
  }

  removeProfile () {
    localStorage.removeItem('profile');
    this.authNotifier.emit('profileChange', false);
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.authNotifier.emit('authChange', { authenticated: true });
  }

  getToken () {
    return localStorage.getItem('access_token');
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    sessionStorage.removeItem('user_books');
    this.profile = null;
    this.authNotifier.emit('authChange', false);
    this.removeProfile();
    // navigate to the home route
    router.replace('/home');
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
