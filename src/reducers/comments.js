import * as constants from '../actions/constants'

function comments(state = {commentsList: [], loading: false, errorLoading: false}, action) {
    switch(action.type) {
        case constants.GET_COMMENTS:
            const {comments, parentId} = action
            const newComments = comments.filter((item) => (!item.deleted))
            const listItem = {
                parentId: parentId,
                comments: newComments,
            }
            let newList = state.commentsList.filter((item) => (item.parentId !== parentId))
            newList.push(listItem)
            return {
                ...state,
                commentsList: newList,
            };
        case constants.LOADING_COMMENTS:
            const {isLoading} = action
            return {
                ...state,
                loading: isLoading,
            };
        case constants.LOADING_COMMENTS_ERROR:
            const {hasErrored} = action
            return {
                ...state,
                errorLoading: hasErrored,
            };
        case constants.ADD_COMMENT:
            const {comment} = action
            return {
                ...state,
                commentsList: state.commentsList.push(comment),
            };
        case constants.DELETE_COMMENT: {
            const commentsList = state.commentsList
            const {id, parentId} = action.comment
            let parent = commentsList.filter((obj) => obj.parentId === parentId)[0]
            const updatedParent = {
                ...parent,
                comments: parent.comments.filter((comment) => comment.id !== id)
            }
            let newCommentsList = commentsList.filter((obj) => obj.parentId !== parentId)
            newCommentsList.push(updatedParent)
            return {
                ...state,
                commentsList: newCommentsList,
            }
        };
        case constants.GET_COMMENT: {
            const {comment} = action
            const parent = comment.parentId
            const updateCommentsList = state.commentsList.reduce((result, item) => {
                if(item.parentId !== parent) {
                    result.push(item)
                    return result
                } else {
                    let updatedComments = item.comments.reduce((updated, comm) => {
                        if(comm.id !== comment.id) {
                            updated.push(comm)
                            return updated
                        } else {
                            updated.push(comment)
                            return updated
                        }
                    }, [])
                    result.push({
                        ...item,
                        comments: updatedComments,
                    })
                    return result
                }
            }, [])
            return {
                ...state,
                commentsList: updateCommentsList,
            }
        };
        default:
            return state
    }
}

export default comments