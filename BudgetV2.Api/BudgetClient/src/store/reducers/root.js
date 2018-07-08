import { combineReducers } from 'redux';
import transactionsReducer from './transactions';
import categoriesReducer from './categories';

export default combineReducers({
    transactionsReducer,
    categoriesReducer
});