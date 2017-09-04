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

class PostItem extends Component {
    state = {
        commentsCount: null,
        editModalOpen: false,
        deleteModalOpen: false,
    }

    componentDidMount() {
        const {post, setComments} = this.props
        setComments(post.id).then((res) => {
            const {comments} = res
            this.setState({
                commentsCount: comments.length
            })
        })
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
        editPost(data, post.id).then(() => {
            alert("Post edited successfully!")
        })
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
        const {post, deletePost} = this.props
        deletePost(post.id).then(() => {
            alert("Post deleted!")
        })
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

    render() {
        const {post, votePost} = this.props
        const {editModalOpen, deleteModalOpen} = this.state
        return (
            <li key={post.id} className="post-item">
                <Link to='/' className="post-top">
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
                        {(this.state.commentsCount !== null) && `${this.state.commentsCount} comments`}
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
            </li>
        )
    }
}

function mapStateToProps({myPosts}) {
    let posts = myPosts.posts
    return {posts}
}

function mapDispatchToProps(dispatch) {
    return {
        deletePost: (id) => dispatch(deletePost(id)),
        editPost: (data, id) => dispatch(editPost(data, id)),
        votePost: (vote, id) => dispatch(votePost(vote, id)),
        setComments: (data) => dispatch(getPostComments(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)

