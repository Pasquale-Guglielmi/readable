/**
 * Created by pasquale on 26/08/2017.
 */

import * as Api from '../utils/Api'
import {loadingCategoriesError, loadingCategories} from './loading'

export const GET_CATEGORIES = 'GET_CATEGORIES';

export function categories({categories}) {
    return {
        type: GET_CATEGORIES,
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

