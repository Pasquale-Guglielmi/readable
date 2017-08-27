/**
 * Created by pasquale on 26/08/2017.
 */
import {GET_CATEGORIES} from '../actions/categories'
import {ERROR, LOADING} from '../actions/loading'
import {GET_ALL_POSTS, CATEGORY_POSTS} from '../actions/posts'
import { combineReducers } from 'redux';

function isLoading(state = {loading: false}, action) {
    const {isLoading} = action
    switch(action.type) {
        case LOADING:
            return {loading: isLoading}
        default:
            return state
    }
}

function loadingError(state = {loadingError: false}, action) {
    const {hasErrored} = action
    switch(action.type) {
        case ERROR:
            return {loadingError: hasErrored}
        default:
            return state
    }
}

function myCategories(state = {categories: null}, action) {
    const {categories} = action
    switch(action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: categories,
            };
        default:
            return state
    }
}

function myPosts(state = {posts: []}, action) {
    switch(action.type) {
        case GET_ALL_POSTS:
            return {
                posts: action.posts
            };
        case CATEGORY_POSTS:
            return {
                posts: action.posts
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

export default combineReducers({
    myCategories: myCategories,
    isLoading: isLoading,
    loadingError: loadingError,
    myPosts: myPosts,
})