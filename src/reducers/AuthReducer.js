import {
    USER_LOGIN_SUCCESS,
    USER_NOT_FOUND,
    LOGIN_SYSTEM_ERROR,
    LOGIN_LOADING,
    LOGOUT,
    COOKIE_CHECKED
} from '../actions/types';

const INITIAL_STATE = {
    username: '',
    error: '',
    email:'',
    loading: false,
    cookie: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return { ...INITIAL_STATE,
                username: action.payload,  email: action.payload.email,
                cookie:true
            };
        case USER_NOT_FOUND:
            return { ...INITIAL_STATE,
                error: 'Username or Password invalid'
            }
        case LOGIN_SYSTEM_ERROR:
            return { ...INITIAL_STATE,
                error: action.payload
            }
            case LOGIN_LOADING :
                return{...state, loading: true}
            case LOGOUT :
                return{...state,cookie: true} //state sama initial state sama untuk disini
            case COOKIE_CHECKED :
                return{...state,cookie: true}
        default:
            return state;
    }
}