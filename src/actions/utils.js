/**
 * Created by pasquale on 07/09/2017.
 */

export const SORT = 'SORT';

export function sort(by) {
    return {
        type: SORT,
        by,
    }
}
