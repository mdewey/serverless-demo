
import auth0 from 'auth0-js';

import history from "../history"

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'dewseph.auth0.com',
    clientID: 'jkNOH6JIaTPJLQv0jGTFQTRKakqDubbN',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://dewseph.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid email'
  });

  
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      console.log({authResult});
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.push('/home');
      } else if (err) {
        history.push('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('email', authResult.idTokenPayload.email);
    // navigate to the home route
    history.replace('/home');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('email');
    // navigate to the home route
    history.push('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}