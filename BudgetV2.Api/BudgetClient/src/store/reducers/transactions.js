import * as actionTypes from '../actions/actionTypes';

const initialState = {
    transactions: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD:
        let newState = {
            ...state
        }
        
        let arr = [...newState.transactions];
        arr.push(action.data.tr);
        newState.transactions = arr;
        return newState;

        default:
            return state
    }
}

export default reducer;