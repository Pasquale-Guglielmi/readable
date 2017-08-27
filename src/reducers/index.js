/**
 * Created by pasquale on 26/08/2017.
 */
import {GET_CATEGORIES, ERROR} from '../actions/categories'
import { combineReducers } from 'redux';



function myCategories(state = {
    loadingError: false,
    categories: null
}, action) {
    switch(action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
            };
        case ERROR:
            return {
                ...state,
                loadingError: true,
            };
        default:
            return state
    }
}


/*function calendar(state = initialCalendarState, action) {
    const {recipe, day, meal} = action
    switch(action.type) {
        case ADD_RECIPE: return {
            ...state,
            [day]: {
                ...state[day],
                [meal]: recipe.label
            }
        }
        case REMOVE_FROM_CALENDAR: return {
            ...state,
            [day]: {
                ...state[day],
                [meal]: null
            }
        }
        default:
            return state
    }
}*/

export default combineReducers({myCategories: myCategories})