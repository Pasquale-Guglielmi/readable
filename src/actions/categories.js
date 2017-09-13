/**
 * Created by pasquale on 26/08/2017.
 */

import * as Api from '../utils/Api'
import {loadingCategoriesError, loadingCategories} from './loading'
import * as constants from '../actions/constants'

export function categories({categories}) {
    return {
        type: constants.GET_CATEGORIES,
        categories,
    }
}

export function fetchCategories() {
    return function (dispatch) {
        dispatch(loadingCategories(true));
        return Api.getCategories().then(
            data => {
                dispatch(categories(data))
                dispatch(loadingCategories(false))
            },
            error => {
                dispatch(loadingCategoriesError())
                dispatch(loadingCategories(false))
            }
        )
    }
}

