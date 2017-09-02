/**
 * Created by pasquale on 26/08/2017.
 */

import * as Api from '../utils/Api'
import {loadingPostsError, loadingPosts} from './loading'

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const CATEGORY_POSTS = 'CATEGORY_POSTS';
export const GET_POST = 'GET_POST';
export const VOTE_POST = 'VOTE_POST';
export const DELETE_POST = 'DELETE_POST';

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

export function voteP(vote, id) {
    return {
        type: VOTE_POST,
        vote: vote,
        id: id,
    }
}

export function fetchAllPosts() {
    return function (dispatch) {
        dispatch(loadingPosts(true))
        return Api.getPosts().then(
            data => {
                dispatch(loadingPosts(false))
                dispatch(posts(data))
            },
            error => {
                dispatch(loadingPosts(false))
                dispatch(loadingPostsError())
            }
        )
    }
}
/*
export function fetchCategoryPosts(category) {
    return function (dispatch) {
        dispatch(loadingPosts(true))
        return Api.getCategoryPosts(category).then(
            data => {
                dispatch(loadingPosts(false))
                dispatch(categoryPosts(data))
            },
            error => {
                dispatch(loadingPosts(false))
                dispatch(loadingPostsError())
            }
        )
    }
}*/

export function fetchPost(id) {
    return function (dispatch) {
        dispatch(loadingPosts(true))
        return Api.getPost(id).then(
            data => {
                dispatch(post(data))
                dispatch(loadingPosts(false))
            },
            error => {
                dispatch(loadingPostsError())
                dispatch(loadingPosts(false))
            }
        )
    }
}

export function votePost(vote, id) {
    return function (dispatch) {
        return Api.votePost(vote, id).then(
            () => {
                dispatch(voteP(vote, id))
            }
        )
    }
}

export function editPost(data, id) {
    return function (dispatch) {
        return Api.editPost(data, id).then(fetchPost(id))
    }
}