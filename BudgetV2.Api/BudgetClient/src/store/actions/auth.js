import * as actionTypes from '../actions/actionTypes';
import axios from '../../api'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const login = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: email,
            password: password
        }
        console.log('LOGIN'+authData);
        axios.post('/auth/login', authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    }
}

export const register = (email, password, confirmPassword) => {
    return dispatch => {
        dispatch(authStart());
        
        const authData = {
            username: email,
            password: password,
            confirmPassword: confirmPassword
        }
        console.log('REGISTER:'+authData);
        axios.post('/auth/register', authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    }
}