/**
 * Created by pasquale on 27/08/2017.
 */
import * as constants from '../actions/constants'

export function loadingPostsError() {
    return {
        type: constants.LOADING_POSTS_ERROR,
        hasErrored: true,
    }
}

export function loadingPosts(boolean) {
    return {
        type: constants.LOADING_POSTS,
        isLoading: boolean,
    }
}

export function loadingCategoriesError() {
    return {
        type: constants.LOADING_CATEGORIES_ERROR,
        hasErrored: true,
    }
}

export function loadingCategories(boolean) {
    return {
        type: constants.LOADING_CATEGORIES,
        isLoading: boolean,
    }
}

export function loadingCommentsError() {
    return {
        type: constants.LOADING_COMMENTS_ERROR,
        hasErrored: true,
    }
}

export function loadingComments(boolean) {
    return {
        type: constants.LOADING_COMMENTS,
        isLoading: boolean,
    }
}

