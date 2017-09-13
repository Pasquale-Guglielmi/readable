/**
 * Created by pasquale on 26/08/2017.
 */
import {GET_CATEGORIES} from '../actions/categories'
import {LOADING_POSTS, LOADING_POSTS_ERROR,
        LOADING_CATEGORIES_ERROR, LOADING_CATEGORIES,
        LOADING_COMMENTS_ERROR, LOADING_COMMENTS} from '../actions/loading'
import {GET_ALL_POSTS,
        VOTE_POST,
        GET_POST,
        DELETE_POST,} from '../actions/posts'
import {GET_COMMENTS, ADD_COMMENT, GET_COMMENT, DELETE_COMMENT} from '../actions/comments'
import {SORT,
        OPEN_MODAL,
        CLOSE_MODAL,} from '../actions/utils'
import { combineReducers } from 'redux';

function myApp(state = {sort: "", modal: {open: false, id: null, which: null,}}, action){
    switch(action.type) {
        case SORT:
            const {by} = action
            return {
                ...state,
                sort: by,
            };
        case OPEN_MODAL:
            const {id, which} = action
            return {
                ...state,
                modal: {
                    open: true,
                    id,
                    which,
                }
            };
        case CLOSE_MODAL:
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

function myCategories(state = {categories: null, loading: false, errorLoading: false}, action) {
    const {categories, hasErrored, isLoading} = action
    switch(action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: categories,
            };
        case LOADING_CATEGORIES:
            return {
                ...state,
                loading: isLoading,
            };
        case LOADING_CATEGORIES_ERROR:
            return {
                ...state,
                errorLoading: hasErrored,
            };
        default:
            return state
    }
}

function myPosts(state = {posts: [], loading: false, errorLoading: false}, action) {
    const {posts, hasErrored, isLoading} = action
    switch(action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                posts,
            };
        case LOADING_POSTS:
            return {
                ...state,
                loading: isLoading,
            };
        case LOADING_POSTS_ERROR:
            return {
                ...state,
                errorLoading: hasErrored,
            };
        case VOTE_POST:
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
        case GET_POST:
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
        case DELETE_POST: {
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

function myComments(state = {commentsList: [], loading: false, errorLoading: false}, action) {
    switch(action.type) {
        case GET_COMMENTS:
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
        case LOADING_COMMENTS:
            const {isLoading} = action
            return {
                ...state,
                loading: isLoading,
            };
        case LOADING_COMMENTS_ERROR:
            const {hasErrored} = action
            return {
                ...state,
                errorLoading: hasErrored,
            };
        case ADD_COMMENT:
            const {comment} = action
            return {
                ...state,
                commentsList: state.commentsList.push(comment),
            };
        case DELETE_COMMENT: {
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
        case GET_COMMENT: {
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

export default combineReducers({
    myCategories: myCategories,
    myPosts: myPosts,
    myComments: myComments,
    myApp: myApp,
})