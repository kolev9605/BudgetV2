import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import authReducer from './auth';
import * as actions from '../actions/actionTypes';

const appReducer = combineReducers({
    categoriesReducer,
    authReducer
})

const rootReducer = (state, action) => {
    if (action.type === actions.LOGOUT) {
        state = undefined
    }

    return appReducer(state, action)
  }

export default rootReducer;