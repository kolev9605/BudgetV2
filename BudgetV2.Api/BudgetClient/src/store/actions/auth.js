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
        authToken: authData.auth_token,
        userId: authData.id
    }
}


export const authFail = (error) => {
    console.log(error)
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
        };

        axios.post('/auth/login', authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log(err.response)
                dispatch(authFail(err.response));
            });
    }
}

export const register = (email, password, confirmPassword) => {
    return dispatch => {
        dispatch(authStart());
        
        const authData = {
            username: email,
            password: password,
            confirmPassword: confirmPassword
        };

        axios.post('/auth/register', authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log(err.response)
                dispatch(authFail(err.response));
            });
    }
}