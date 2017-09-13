import * as constants from '../actions/constants'

function categories(state = {categories: null, loading: false, errorLoading: false}, action) {
    const {categories, hasErrored, isLoading} = action
    switch(action.type) {
        case constants.GET_CATEGORIES:
            return {
                ...state,
                categories: categories,
            };
        case constants.LOADING_CATEGORIES:
            return {
                ...state,
                loading: isLoading,
            };
        case constants.LOADING_CATEGORIES_ERROR:
            return {
                ...state,
                errorLoading: hasErrored,
            };
        default:
            return state
    }
}

export default categories
