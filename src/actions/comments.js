/**
 * Created by pasquale on 26/08/2017.
 */

import * as Api from '../utils/Api';
import {loadingComments, loadingCommentsError} from '../actions/loading'

export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const GET_COMMENT = 'GET_COMMENT';

export function getComment(comment) {
    return {
        type: GET_COMMENT,
        comment,
    }
}

export function getComments({comments, parentId}) {
    return {
        type: GET_COMMENTS,
        comments,
        parentId,
    }
}

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function getPostComments(id) {
    return function(dispatch) {
        dispatch(loadingComments(true))
        return Api.getPostComments(id).then((items) => {
                dispatch(loadingComments(false))
                return dispatch(getComments({comments: items, parentId: id}))
            },
            (err) => {
                dispatch(loadingComments(false))
                dispatch(loadingCommentsError(true))
            })
    }
}

export function addNewComment(data) {
    return function(dispatch) {
        return Api.commentPost(data).then(() => {
            Api.getCommentDetails(data.id).then((comment) => {
                dispatch(addComment(comment))
            })
        })
    }
}

export function voteComment(vote, id) {
    return function (dispatch) {
        return Api.voteComment(vote, id).then(() => {
            Api.getCommentDetails(id).then((comment) => {
                dispatch(getComment(comment))
            })
        })
    }
}

export function deleteComment(comment) {
    const {id, parentId} = comment
    return function (dispatch) {
        return Api.deleteComment(id).then(() => {
            dispatch(getPostComments(parentId))
        })
    }
}

export function editComment(data, id) {
    return function (dispatch) {
        return Api.editComment(data, id).then(() => {
            Api.getCommentDetails(id).then((comment) => {
                dispatch(getComment(comment))
            })
        })
    }
}
