/**
 * Created by pasquale on 26/08/2017.
 */

import * as Api from '../utils/Api';
import {loadingComments, loadingCommentsError} from '../actions/loading'

export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';

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

