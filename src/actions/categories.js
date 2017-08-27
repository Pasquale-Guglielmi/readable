/**
 * Created by pasquale on 26/08/2017.
 */

import * as Api from '../utils/Api'

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const CATEGORY_POSTS = 'CATEGORY_POSTS';
export const ERROR = 'ERROR';

export function loadingError() {
    return {
        type: ERROR
    }
}

export function categories({categories}) {
    return {
        type: GET_CATEGORIES,
        categories,
    }
}

export function categoryPosts(posts) {
    return {
        type: CATEGORY_POSTS,
        posts,
    }
}

export function fetchCategories() {
    return function (dispatch) {
        return Api.getCategories().then(
            data => dispatch(categories(data)),
            error => dispatch(loadingError({error: 'Loading Error!!!'}))
        )
    }
}

export function fetchCategoryPosts(category) {
    return function (dispatch) {
        return Api.getCategoryPosts(category).then(
            data => dispatch(categoryPosts(data)),
            error => dispatch(loadingError())
        )
    }
}

