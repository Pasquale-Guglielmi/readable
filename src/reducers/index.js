/**
 * Created by pasquale on 26/08/2017.
 */
import {GET_CATEGORIES, CATEGORY_POSTS} from '../actions/categories'
import { combineReducers } from 'redux';



function myCategories(state = [], action) {
    switch(action.type) {
        case GET_CATEGORIES:
            return action.categories;
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