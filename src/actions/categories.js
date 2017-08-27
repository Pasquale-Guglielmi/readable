/**
 * Created by pasquale on 26/08/2017.
 */

import * as Api from '../utils/Api'

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const CATEGORY_POSTS = 'CATEGORY_POSTS';
export const ERROR = 'ERROR';
export const LOADING = 'LOADING';

export function loadingError() {
    return {
        type: ERROR,
        hasErrored: true,
    }
}

export function isLoading(boolean) {
    return {
        type: LOADING,
        isLoading: boolean,
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
        dispatch(isLoading(true));
        return Api.getCategories().then(
            data => {
                dispatch(categories(data))
                dispatch(isLoading(false))
            },
            error => {
                dispatch(loadingError())
                dispatch(isLoading(false))
            }
        )
    }
}

export function fetchCategoryPosts(category) {
    return function (dispatch) {
        dispatch(isLoading(true))
        return Api.getCategoryPosts(category).then(
            data => {
                dispatch(categoryPosts(data))},
            error => dispatch(loadingError())
        )
    }
}

