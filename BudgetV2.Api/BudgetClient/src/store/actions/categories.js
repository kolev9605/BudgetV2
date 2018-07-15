import * as actionTypes from '../actions/actionTypes';
import axios from '../../api'

export const getCategories = (token) => {
    return dispatch => {
        var config = {
            headers: {'Authorization': "Bearer " + token}
        };

        axios.get('values', config)
            .then(response => {
                dispatch(getCategoriesSuccess(response));             
        });
    }
}

export const getCategoriesSuccess = (response) => {
    console.log(response)
    return {
        type: actionTypes.GET_CATEGORIES,
        categories: response.data
    }
}