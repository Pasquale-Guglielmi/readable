/**
 * Created by pasquale on 07/09/2017.
 */

export const SORT = 'SORT';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function sort(by) {
    return {
        type: SORT,
        by,
    }
}

export function openModal({id, which}) {
    return {
        type: OPEN_MODAL,
        id,
        which,
    }
}

export function closeModal() {
    return {
        type: CLOSE_MODAL,
    }
}


