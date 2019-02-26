import auth0 from 'auth0-js'
import EventEmitter from 'eventemitter3'
import router from '../router'

class AuthService {
    accessToken;
    idToken;
    expiresAt;
    authenticated = this.isAuthenticated();
    authNotifier = new EventEmitter();


    auth0 = new auth0.WebAuth({
        domain: 'contributor.eu.auth0.com',
        clientID: 'KBltFACse8MW5Awg74MaTTGqalUVngeZ',
        responseType: 'token id_token',
        scope: 'openid',
        audience: 'https://contributor/api',
        redirectUri: 'http://localhost:8080',
    });

    login () {
        this.auth0.authorize()
    }

    handleAuthentication (fn) {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                router.replace('/')
                fn()
            } else if (err) {
                router.replace('/');
                // console.log(err);
            }
        })
    }

    setSession (authResult) {
        this.accessToken = authResult.accessToken;
        localStorage.setItem('accessToken', this.accessToken);
        this.idToken = authResult.idToken;
        localStorage.setItem('idToken', this.idToken);
        this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
        localStorage.setItem('expiresAt', this.expiresAt);
        this.authNotifier.emit('authChange', { authenticated: true });

        localStorage.setItem('loggedIn', true)
    }

    renewSession () {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult)
            } else if (err) {
                this.logout();
                // console.log(err);
            }
        })
    }

    logout () {
        // Clear access token and ID token from local storage
        this.accessToken = null;
        localStorage.removeItem("accessToken");
        this.idToken = null;
        localStorage.removeItem("idToken");
        this.expiresAt = null;
        localStorage.removeItem("expiresAt");

        this.userProfile = null;
        this.authNotifier.emit('authChange', false);

        localStorage.removeItem('loggedIn');

        // navigate to the home route
        router.replace('/');
        location.reload();
    }

    getAuthenticatedFlag () {
        return localStorage.getItem('loggedIn')
    }

    isAuthenticated () {
        return new Date().getTime() < localStorage.getItem("expiresAt") && this.getAuthenticatedFlag() === 'true'
    }
}

export default AuthService = new AuthService();