let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3001';
        break;
    case 'https://delicioso-cart-client.herokuapp.com':
        APIURL = 'https://delicioso-cart-server.herokuapp.com'
}

export default APIURL