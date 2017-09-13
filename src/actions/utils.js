/**
 * Created by pasquale on 07/09/2017.
 */
import * as constants from '../actions/constants'

export function sort(by) {
    return {
        type: constants.SORT,
        by,
    }
}

export function openModal({id, which}) {
    return {
        type: constants.OPEN_MODAL,
        id,
        which,
    }
}

export function closeModal() {
    return {
        type: constants.CLOSE_MODAL,
    }
}


