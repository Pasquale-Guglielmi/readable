/**
 * Created by pasquale on 04/09/2017.
 */
/**
 * Created by pasquale on 27/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Like from 'react-icons/lib/fa/thumbs-up';
import Unlike from 'react-icons/lib/fa/thumbs-down';
import Close from 'react-icons/lib/fa/close';
import {getPostComments} from '../actions/comments';
import {votePost, editPost, deletePost} from '../actions/posts';
import '../styles/postsList.css';
import Modal from 'react-modal';
import Comment from './Comment';
import {addNewComment} from '../actions/comments';

class PostDetails extends Component {
    state = {
        comments: null,
        editModalOpen: false,
        deleteModalOpen: false,
        detailsOpen: false,
        post: null,
    }


    updatePost(someProps) {
        const {posts, match} = someProps;
        const id = match.params.id
        const post = posts.filter((item) => (item.id === id))[0]
        this.setState({
            post: post,
        })
    }

    updateComments(someProps) {
        const {setComments, match} = someProps
        const id = match.params.id
        setComments(id).then((res) => {
            const {comments} = res
            this.setState({
                comments: comments,
            })
        })

    }

    componentDidMount() {
        this.updatePost(this.props)
        this.updateComments(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.posts !== this.props.posts) {
            this.updatePost(nextProps);
        }
    }

    editHandler(event) {
        event.preventDefault()
        const title = this.titleInput.value
        const body = this.bodyInput.value
        const {editPost} = this.props
        const {post} = this.state
        if((title === post.title) && (body === post.body)) {
            alert("No changes to be submitted")
            return
        }
        const data = {
            title,
            body,
        }
        editPost(data, post.id)
    }

    openEditModal = () => {
        this.setState({
            editModalOpen: true,
        })
    }

    closeEditModal = () => {
        this.setState({
            editModalOpen: false,
        })
    }

    deleteHandler() {
        const {deletePost} = this.props
        const {post} = this.state
        deletePost(post.id)
    }


    openDeleteModal = () => {
        this.setState({
            deleteModalOpen: true,
        })
    }

    closeDeleteModal = () => {
        this.setState({
            deleteModalOpen: false,
        })
    }

    addCommentHandler() {
        const {addComment} = this.props
        const {post} = this.state
        addComment(post.id)
    }


    openAddCommentModal = () => {
        this.setState({
            addCommentModalOpen: true,
        })
    }

    closeAddCommentModal = () => {
        this.setState({
            addCommentModalOpen: false,
        })
    }

    formatDate(d) {
        const date = new Date(d)
        return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay()
    }

    render() {
        const {votePost} = this.props
        const {editModalOpen, deleteModalOpen, post, comments} = this.state
        {if(post) {
            return (
                <div className="post-item">
                    <div className="post-details">
                        <h2>{post.title}</h2>
                        <p> by <strong>{post.author}</strong></p>
                        <div className="post-body">
                            <p>{post.body}</p><br/><br/><br/>
                            <p>Posted on: {this.formatDate(post.timestamp)}</p>
                        </div>
                    </div>
                    <div className="post-bottom">
                        <div className="score">
                            {post.voteScore}
                            <button
                                className='icon-btn'
                                onClick={() => {
                                    votePost("upVote", post.id)
                                }}>
                                <Like size={20}/>
                            </button>
                            <button
                                className='icon-btn'
                                onClick={() => {
                                    votePost("downVote", post.id)
                                }}>
                                <Unlike size={20}/>
                            </button>
                        </div>
                        <div className="comments-count">
                            {(comments !== null) && `${comments.length} comments`}
                        </div>
                        <div>
                            <button
                                className="edit-button"
                                onClick={() => {
                                    this.openEditModal()
                                }}>
                                Edit
                            </button>
                            <button
                                className="edit-button"
                                onClick={() => {
                                    this.openDeleteModal()
                                }}>
                                Delete
                            </button>
                            <button
                                className="edit-button"
                                onClick={() => {
                                    this.openAddCommentModal()
                                }}>
                                Comment
                            </button>
                        </div>
                    </div>
                    <div className="comments">
                        {(comments !== null && comments.length > 0) && <h3>Comments</h3>}
                        <ul className="comments-list">
                            {(comments !== null && comments.length > 0) &&
                                comments.filter((item) => (!item.deleted)).map((item) => <Comment comment={item} key={item.id} className="comment-item"></Comment>)
                            }
                        </ul>
                    </div>
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={editModalOpen}
                        onRequestClose={this.closeEditModal}
                        contentLabel='Modal'
                    >
                        <div className="close-modal-btn">
                            <button
                                className="icon-btn close"
                                onClick={() => {
                                    this.closeEditModal()
                                }}>
                                <Close size={20}></Close>
                            </button>
                        </div>
                        <div className="edit-main">
                            <form
                                className="edit-main"
                                onSubmit={(evt) => {
                                    this.editHandler(evt)
                                }}>
                                <label className="edit-input">
                                    Title:
                                    <textarea
                                        required="true"
                                        className="title-input"
                                        defaultValue={post.title}
                                        ref={(input) => this.titleInput = input}
                                    />
                                </label>
                                <label className="edit-input">
                                    Body:
                                    <textarea
                                        required="true"
                                        className="body-input"
                                        defaultValue={post.body}
                                        ref={(input) => this.bodyInput = input}
                                    />
                                </label>
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="edit-button"
                                >
                                </input>
                            </form>
                        </div>
                    </Modal>
                    <Modal
                        className='delete-modal'
                        overlayClassName='overlay'
                        isOpen={deleteModalOpen}
                        onRequestClose={this.closeDeleteModal}
                        contentLabel='Modal'
                    >
                        <div className="delete-message">Are you sure you want delete this post?</div>
                        <div className="delete-message-buttons">
                            <button
                                className="edit-button"
                                onClick={() => {
                                    this.deleteHandler()
                                }}
                            >Yes</button>
                            <button
                                className="edit-button"
                                onClick={() => {
                                    this.closeDeleteModal()
                                }}
                            >No</button>
                        </div>
                    </Modal>
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={editModalOpen}
                        onRequestClose={this.closeAddCommentModal}
                        contentLabel='Modal'
                    >
                        <div className="close-modal-btn">
                            <button
                                className="icon-btn close"
                                onClick={() => {
                                    this.closeAddCommentModal
                                }}>
                                <Close size={20}></Close>
                            </button>
                        </div>
                        <div className="edit-main">
                            <form
                                className="edit-main"
                                onSubmit={(evt) => {
                                    this.addPostHandler(evt)
                                }}>
                                <label className="edit-input">
                                    Title:
                                    <textarea
                                        required="true"
                                        className="title-input"
                                        placeholder="post title"
                                        ref={(input) => this.newPostTitle = input}
                                    />
                                </label>
                                <label className="edit-input">
                                    Author:
                                    <textarea
                                        required="true"
                                        className="title-input"
                                        placeholder="author name"
                                        ref={(input) => this.newPostAuthor = input}
                                    />
                                </label>
                                <label className="edit-input">
                                    Body:
                                    <textarea
                                        required="true"
                                        className="body-input"
                                        placeholder="post body"
                                        ref={(input) => this.newPostBody = input}
                                    />
                                </label>
                                <select required ref={(input) => this.newPostCategory = input} className="top-button">
                                    <option value="">Select a category</option>
                                    <option value="react">react</option>
                                    <option value="redux">redux</option>
                                    <option value="udacity">udacity</option>
                                </select>
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="edit-button"
                                >
                                </input>
                            </form>
                        </div>
                    </Modal>
                </div>
            )
        }else {
            return(<div>Loading post details...</div>)
        }
            }
    }
}

function mapStateToProps({myPosts, myComments}) {
    let posts = myPosts.posts
    return {posts, myComments}
}

function mapDispatchToProps(dispatch) {
    return {
        deletePost: (id) => dispatch(deletePost(id)),
        editPost: (data, id) => dispatch(editPost(data, id)),
        votePost: (vote, id) => dispatch(votePost(vote, id)),
        setComments: (data) => dispatch(getPostComments(data)),
        addComment: (data) => dispatch(addNewComment(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
