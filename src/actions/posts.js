/**
 * Created by pasquale on 26/08/2017.
 */

import * as Api from '../utils/Api'
import {loadingError, isLoading} from './loading'

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const CATEGORY_POSTS = 'CATEGORY_POSTS';
export const GET_POST = 'GET_POST';

export function posts(posts) {
    return {
        type: GET_ALL_POSTS,
        posts,
    }
}

export function categoryPosts(posts) {
    return {
        type: CATEGORY_POSTS,
        posts,
    }
}

export function post(post) {
    return {
        type: GET_POST,
        post,
    }
}

export function fetchAllPosts() {
    return function (dispatch) {
        dispatch(isLoading(true))
        return Api.getPosts().then(
            data => {
                dispatch(posts(data))
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
                dispatch(categoryPosts(data))
                dispatch(isLoading(false))
            },
            error => {
                dispatch(loadingError())
                dispatch(isLoading(false))
            }
        )
    }
}

export function fetchPost(id) {
    return function (dispatch) {
        dispatch(isLoading(true))
        return Api.getPost(id).then(
            data => {
                dispatch(post(data))
                dispatch(isLoading(false))
            },
            error => {
                dispatch(loadingError())
                dispatch(isLoading(false))
            }
        )
    }
}
