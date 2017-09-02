/**
 * Created by pasquale on 26/08/2017.
 */

import * as Api from '../utils/Api';
import {loadingComments, loadingCommentsError} from '../actions/loading'

export const GET_COMMENTS = 'GET_COMMENTS';

export function getComments({comments, parentId}) {
    return {
        type: GET_COMMENTS,
        comments,
        parentId,
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


