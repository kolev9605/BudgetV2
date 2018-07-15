import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    categories: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES:
            return getCategories(state, action);
        default:
            return state
    }
}

const getCategories = (state, action) => {
    return updateObject(state, { categories: action.categories });
}

export default reducer;