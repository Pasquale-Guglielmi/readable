/**
 * Created by pasquale on 27/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/*import { Link } from 'react-router-dom';*/
import Like from 'react-icons/lib/fa/thumbs-up';
import Unlike from 'react-icons/lib/fa/thumbs-down';
import Close from 'react-icons/lib/fa/close';
/*import {votePost, editPost, deletePost} from '../actions/posts';*/
import Modal from 'react-modal';
import '../styles/comments.css';

class Comment extends Component {
    state = {
        editModalOpen: false,
        deleteModalOpen: false,
        detailsOpen: false,
    }

    update(someProps) {
    }

    componentDidMount() {
        this.update(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps)
    }

/*    editHandler(event) {
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
    }*/

/*    deleteHandler() {
        const {post, deletePost} = this.props
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
    }*/

    render() {
        const {comment, voteComment} = this.props
        const {editModalOpen, deleteModalOpen} = this.state
        return (
            <div className="comment-item">
                    <h2>{comment.title}</h2>
                    <p> by <strong>{comment.author}</strong></p>
                    <p className="comment-body">
                        {comment.body}
                    </p>
                <div className="post-bottom">
                    <div className="score">
                        {comment.voteScore}
                        <button
                            className='icon-btn'
                            onClick={() => {
                                voteComment("upVote", comment.id)
                            }}>
                            <Like size={20}/>
                        </button>
                        <button
                            className='icon-btn'
                            onClick={() => {
                                voteComment("downVote", comment.id)
                            }}>
                            <Unlike size={20}/>
                        </button>
                    </div>
{/*                    <div>
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
                    </div>*/}
                </div>
{/*                <Modal
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
                </Modal>*/}
{/*                <Modal
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
                </Modal>*/}
            </div>
        )
    }
}

function mapStateToProps({myComments}) {
    let comments = myComments.comments
    return {comments}
}

function mapDispatchToProps(dispatch) {
    return {
     /*   deleteComment: (id) => dispatch(deleteComment(id)),
        editComment: (data, id) => dispatch(editComment(data, id)),
        voteComment: (vote, id) => dispatch(voteComment(vote, id)),*/
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)

