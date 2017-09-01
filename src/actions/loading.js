/**
 * Created by pasquale on 27/08/2017.
 */
export const LOADING_POSTS_ERROR = 'LOADING_POSTS_ERROR';
export const LOADING_POSTS = 'LOADING_POSTS';
export const LOADING_CATEGORIES_ERROR = 'LOADING_CATEGORIES_ERROR';
export const LOADING_CATEGORIES = 'LOADING_CATEGORIES';
export const LOADING_COMMENTS_ERROR = 'LOADING_COMMENTS_ERROR';
export const LOADING_COMMENTS = 'LOADING_COMMENTS';


export function loadingPostsError() {
    return {
        type: LOADING_POSTS_ERROR,
        hasErrored: true,
    }
}

export function loadingPosts(boolean) {
    return {
        type: LOADING_POSTS,
        isLoading: boolean,
    }
}

export function loadingCategoriesError() {
    return {
        type: LOADING_CATEGORIES_ERROR,
        hasErrored: true,
    }
}

export function loadingCategories(boolean) {
    return {
        type: LOADING_CATEGORIES,
        isLoading: boolean,
    }
}

export function loadingCommentsError() {
    return {
        type: LOADING_COMMENTS_ERROR,
        hasErrored: true,
    }
}

export function loadingComments(boolean) {
    return {
        type: LOADING_COMMENTS,
        isLoading: boolean,
    }
}

