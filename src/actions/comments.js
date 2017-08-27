/**
 * Created by pasquale on 26/08/2017.
 */

import * as Api from '../utils/Api'
import {loadingError, isLoading} from './loading'

export const GET_COMMENTS = 'GET_COMMENTS';

export function getComments({comments, parentId}) {
    return {
        type: GET_COMMENTS,
        comments,
        parentId,
    }
}


