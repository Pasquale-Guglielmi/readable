/**
 * Created by pasquale on 27/08/2017.
 */
export const ERROR = 'ERROR';
export const LOADING = 'LOADING';

export function loadingError() {
    return {
        type: ERROR,
        hasErrored: true,
    }
}

export function isLoading(boolean) {
    return {
        type: LOADING,
        isLoading: boolean,
    }
}