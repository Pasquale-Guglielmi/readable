import * as constants from '../actions/constants'

function app(state = {sort: "", modal: {open: false, id: null, which: null,}}, action){
    switch(action.type) {
        case constants.SORT:
            const {by} = action
            return {
                ...state,
                sort: by,
            };
        case constants.OPEN_MODAL:
            const {id, which} = action
            return {
                ...state,
                modal: {
                    open: true,
                    id,
                    which,
                }
            };
        case constants.CLOSE_MODAL:
            return {
                ...state,
                modal: {
                    open: false,
                    id: null,
                    which: null,
                }
            };
        default:
            return state
    }
}

export default app
