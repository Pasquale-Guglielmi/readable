/**
 * Created by pasquale on 07/09/2017.
 */

export const SORT = 'SORT';
export const OPEN_ADD_POST_MODAL = 'OPEN_ADD_POST_MODAL';
export const CLOSE_ADD_POST_MODAL = 'CLOSE_ADD_POST_MODAL';
export const OPEN_DELETE_MODAL = 'OPEN_DELETE_MODAL';
export const CLOSE_DELETE_MODAL = 'CLOSE_DELETE_MODAL';

export function sort(by) {
    return {
        type: SORT,
        by,
    }
}

export function openAddPostModal() {
    return {
        type: OPEN_ADD_POST_MODAL,
    }
}

export function closeAddPostModal() {
    return {
        type: CLOSE_ADD_POST_MODAL,
    }
}

export function openDeleteModal(id) {
    return {
        type: OPEN_DELETE_MODAL,
        id,
    }
}

export function closeDeleteModal() {
    return {
        type: CLOSE_DELETE_MODAL,
    }
}


