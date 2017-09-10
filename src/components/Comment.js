/**
 * Created by pasquale on 27/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/comments.css';
import Like from 'react-icons/lib/fa/thumbs-up';
import Unlike from 'react-icons/lib/fa/thumbs-down';
import Close from 'react-icons/lib/fa/close';
import {voteComment, deleteComment, editComment} from '../actions/comments';
import {openModal, closeModal} from '../actions/utils';
import Modal from 'react-modal';

class Comment extends Component {

    editHandler(event) {
        event.preventDefault()
        const {editComment, comment} = this.props
        const body = this.bodyInput.value
        if(body === comment.body) {
            alert("No changes to be submitted")
            return
        }
        const data = {
            timestamp: Date.now(),
            body,
        }
        this.closeModal()
        editComment(data, comment.id)
    }

    openEditModal = () => {
        const {openModal, comment} = this.props
        openModal({id: comment.id, which: "editComment"})
    }

    deleteHandler() {
        const {comment, deleteComment} = this.props
        this.closeModal()
        deleteComment(comment)
    }


    openDeleteModal = () => {
        const {openModal, comment} = this.props
        openModal({id: comment.id, which: "deleteComment"})
    }

    closeModal = () => {
        const {closeModal} = this.props
        closeModal()
    }

    render() {
        const {comment, voteComment, modal} = this.props
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
{                    <div>
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
                    </div>}
                </div>
{               <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={(modal.open) && (modal.which === "editComment") && (modal.id === comment.id)}
                    onRequestClose={this.closeModal}
                    contentLabel='Modal'
                >
                    <div className="close-modal-btn">
                        <button
                            className="icon-btn close"
                            onClick={() => {
                                this.closeModal()
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
                                Body:
                                <textarea
                                    required="true"
                                    className="body-input"
                                    defaultValue={comment.body}
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
                </Modal>}
{                <Modal
                    className='delete-modal'
                    overlayClassName='overlay'
                    isOpen={(modal.open) && (modal.which === "deleteComment") && (modal.id === comment.id)}
                    onRequestClose={this.closeModal}
                    contentLabel='Modal'
                >
                    <div className="delete-message">Are you sure you want delete this comment?</div>
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
                                this.closeModal()
                            }}
                        >No</button>
                    </div>
                </Modal>}
            </div>
        )
    }
}

function mapStateToProps({myComments, myApp}) {
    let comments = myComments.commentsList
    let modal = myApp.modal
    return {comments, modal}
}

function mapDispatchToProps(dispatch) {
    return {
        openModal: ({id, which}) => dispatch(openModal({id, which})),
        closeModal: () => dispatch(closeModal()),
        voteComment: (id, vote) => dispatch(voteComment(id, vote)),
        deleteComment: (comment) => dispatch(deleteComment(comment)),
        editComment: (data, id) => dispatch(editComment(data, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)

