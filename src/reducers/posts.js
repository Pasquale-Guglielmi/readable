import * as constants from '../actions/constants'

function posts(state = {posts: [], loading: false, errorLoading: false}, action) {
    const {posts, hasErrored, isLoading} = action
    switch(action.type) {
        case constants.GET_ALL_POSTS:
            return {
                ...state,
                posts,
            };
        case constants.LOADING_POSTS:
            return {
                ...state,
                loading: isLoading,
            };
        case constants.LOADING_POSTS_ERROR:
            return {
                ...state,
                errorLoading: hasErrored,
            };
        case constants.VOTE_POST:
            const {vote, id} = action
            const postsUpdated = state.posts.reduce((result, item) => {
                if(item.id !== id) {
                    result.push(item)
                    return result
                } else if(vote === "upVote") {
                    item.voteScore ++
                    result.push(item)
                    return result
                } else {
                    item.voteScore --
                    result.push(item)
                    return result
                }
            }, [])
            return {
                ...state,
                posts: postsUpdated
            };
        case constants.GET_POST:
            const {post} = action
            const updatedPosts = state.posts.reduce((result, item) => {
                if(item.id !== post.id) {
                    result.push(item)
                    return result
                } else {
                    result.push(
                        Object.assign({}, item, post)
                    )
                    return result
                }
            }, [])
            return {
                ...state,
                posts: updatedPosts
            };
        case constants.DELETE_POST: {
            const {id} = action
            const posts = state.posts.reduce((result, post) => {
                if(post.id === id) {
                    const deletedPost = {
                        ...post,
                        deleted: true,
                    }
                    result.push(deletedPost)
                    return result
                } else {
                    result.push(post)
                    return result
                }
            }, [])
            return {
                ...state,
                posts: posts,
            }}
        default:
            return state
    }
}

export default posts