/**
 * Created by pasquale on 26/08/2017.
 */

import * as Api from '../utils/Api';
import {loadingComments, loadingCommentsError} from '../actions/loading'
import * as constants from '../actions/constants'

export function removeComment(comment) {
    return {
        type: constants.DELETE_COMMENT,
        comment,
    }
}

export function getComment(comment) {
    return {
        type: constants.GET_COMMENT,
        comment,
    }
}

export function getComments({comments, parentId}) {
    return {
        type: constants.GET_COMMENTS,
        comments,
        parentId,
    }
}

export function addComment(comment) {
    return {
        type: constants.ADD_COMMENT,
        comment
    }
}

export function getPostComments(id) {
    return function(dispatch) {
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
    const {id} = comment
    return function (dispatch) {
        return Api.deleteComment(id).then(() => {
            dispatch(removeComment(comment))
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
