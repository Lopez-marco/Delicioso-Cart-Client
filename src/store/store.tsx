import { createStore } from 'redux';
import { storeInterface } from './storeInterface';

const SET_USER = 'set-username'
const SET_TOKEN = 'set-token'
const SET_LOCATION = 'set-location'
const SET_FAVE_STORE = 'set-fave-store'
const SET_LOGGEDIN = 'set-loggedIn'
const SET_ISADMIN = 'set-isAdmin'

//REDUCER
const initialState: storeInterface = {
    username: '',
    token: '',
    location: {
        lat: 0,
        long: 0,
    },
    fave_store: '',
    isLoggedIn: false,
    isAdmin: false
}

function rootReducer(state = initialState, action: any) {
    switch (action.type) {
        case SET_USER:
            state.username = action.payload.username;
            return state;
        case SET_TOKEN:
            state.token = action.payload.token;
            return state;
        case SET_LOCATION:
            state.location = action.payload.location;
            return state;
        case SET_FAVE_STORE:
            state.fave_store = action.payload.fave_store;
            return state;
        case SET_LOGGEDIN:
            state.isLoggedIn = action.payload.isLoggedIn;
            return state;
        case SET_ISADMIN:
            state.isAdmin = action.payload.isAdmin;
            return state;
        default:
            return state;
    }
}

//ACTIONS
export function setUsername(payload: any) {
    return {
        type: SET_USER,
        payload
    }
}
export function setToken(payload:any) {
    return {
        type: SET_TOKEN,
        payload
    }
}
export function setLocation(payload:any) {
    return {
        type: SET_LOCATION,
        payload
    }
}
export function setFavoriteStore(payload:any) {
    return {
        type: SET_FAVE_STORE,
        payload
    }
}
export function setIsLoggenIn(payload:any) {
    return {
        type: SET_LOGGEDIN,
        payload
    }
}
export function setIsAdmin(payload:any) {
    return {
        type: SET_ISADMIN,
        payload
    }
}


declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}

export default createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());