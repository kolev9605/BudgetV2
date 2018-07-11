import { combineReducers } from 'redux';
import transactionsReducer from './transactions';
import categoriesReducer from './categories';
import authReducer from './auth';

export default combineReducers({
    transactionsReducer,
    categoriesReducer,
    authReducer
});