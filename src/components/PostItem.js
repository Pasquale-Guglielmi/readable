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
import Modal from 'react-modal';
import {openAddPostModal,
    closeAddPostModal,
    openDeleteModal,
    closeDeleteModal} from '../actions/utils';

class PostItem extends Component {
    state = {
        editModalOpen: false,
    }

    update(someProps) {
        const {post, getComments} = someProps;
        getComments(post.id)
    }

    getPostComments() {
        const {comments, post} = this.props
        const postComments = comments.filter((item) => item.parentId === post.id)
        if(postComments.length > 0) {
            return postComments[0].comments
        } else return []
    }

    componentDidMount() {
        this.update(this.props)
    }

    editHandler(event) {
        event.preventDefault()
        const title = this.titleInput.value
        const body = this.bodyInput.value
        const {editPost, post} = this.props
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

    deleteHandler(id) {
        const {deletePost} = this.props
        deletePost(id).then(() => {
            this.closeDeleteModal()
        })
    }
    

    openDeleteModal = () => {
        const {openDeleteModal, post} = this.props
        openDeleteModal(post.id)
    }

    closeDeleteModal() {
        const {closeDeleteModal} = this.props
        closeDeleteModal()
    }

    render() {
        const {post, votePost, deleteModal} = this.props
        const {editModalOpen} = this.state
        const comments = this.getPostComments()
        return (
            <div className="post-item">
                <Link to={`/${post.category}/${post.id}`} className="post-top">
                    <h2>{post.title}</h2>
                    <p> by <strong>{post.author}</strong></p>
                </Link>
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
                        {(comments) && `${comments.length} comments`}
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
                    </div>
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
                    isOpen={deleteModal.open}
                    onRequestClose={this.closeDeleteModal}
                    contentLabel='Modal'
                >
                    <div className="delete-message">Are you sure you want delete this post?</div>
                    <div className="delete-message-buttons">
                        <button
                            className="edit-button"
                            onClick={() => {
                                this.deleteHandler(deleteModal.id)
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
            </div>
        )
    }
}

function mapStateToProps({myPosts, myApp, myComments}) {
    let posts = myPosts.posts
    let comments = myComments.commentsList
    return {posts, comments, ...myApp}
}

function mapDispatchToProps(dispatch) {
    return {
        openDeleteModal: (id) => dispatch(openDeleteModal(id)),
        closeDeleteModal: () => dispatch(closeDeleteModal()),
        deletePost: (id) => dispatch(deletePost(id)),
        editPost: (data, id) => dispatch(editPost(data, id)),
        votePost: (vote, id) => dispatch(votePost(vote, id)),
        getComments: (data) => dispatch(getPostComments(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)

