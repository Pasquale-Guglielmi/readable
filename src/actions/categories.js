/**
 * Created by pasquale on 26/08/2017.
 */

import * as Api from '../utils/Api'
import {loadingError, isLoading} from './loading'

export const GET_CATEGORIES = 'GET_CATEGORIES';

export function categories({categories}) {
    return {
        type: GET_CATEGORIES,
        categories,
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

