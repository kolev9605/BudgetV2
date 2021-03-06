import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    authToken: null,
    userId: null,
    error: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        default:
            return state
    }
};

const authStart = (state) => {
    return updateObject(state, {error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        authToken: action.authToken, 
        userId: action.userId, 
        error: null, 
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
   });
};

export default reducer;