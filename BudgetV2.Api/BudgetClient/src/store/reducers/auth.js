import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    authToken: null,
    userId: null,
    error: null,
    loading: false
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {error: null, loading: true });
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {
                authToken: action.authToken, 
                userId: action.userId, 
                error: null, 
                loading: false
            });
        case actionTypes.AUTH_FAIL:
            return updateObject(state, {
                 error: action.error,
                 loading: false
            });
        default:
            return state
    }
}

export default reducer;