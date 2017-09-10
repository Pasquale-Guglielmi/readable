/**
 * Created by pasquale on 27/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Like from 'react-icons/lib/fa/thumbs-up';
import Unlike from 'react-icons/lib/fa/thumbs-down';
import {getPostComments} from '../actions/comments';
import {votePost, deletePost} from '../actions/posts';
import {openModal, closeModal} from '../actions/utils';
import Modal from 'react-modal';

class PostItem extends Component {

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

    deleteHandler(id) {
        const {deletePost} = this.props
        this.closeModal()
        deletePost(id)
    }
    

    openDeleteModal = () => {
        const {openModal, post} = this.props
        openModal({id: post.id, which: "deletePost"})
    }

    closeModal() {
        const {closeModal} = this.props
        closeModal()
    }

    redirect(url) {
        window.location = url
    }

    render() {
        const {post, votePost, modal} = this.props
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
                                this.redirect("/post/" + post.id)
                            }}
                        >
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
                    className='delete-modal'
                    overlayClassName='overlay'
                    isOpen={(modal.open) && (modal.which === "deletePost") && (modal.id === post.id)}
                    onRequestClose={this.closeModal}
                    contentLabel='Modal'
                >
                    <div className="delete-message">Are you sure you want delete this post?</div>
                    <div className="delete-message-buttons">
                        <button
                            className="edit-button"
                            onClick={() => {
                                this.deleteHandler(modal.id)
                            }}
                        >Yes</button>
                        <button
                            className="edit-button"
                            onClick={() => {
                                this.closeModal()
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
        openModal: ({id, which}) => dispatch(openModal({id, which})),
        closeModal: () => dispatch(closeModal()),
        deletePost: (id) => dispatch(deletePost(id)),
        votePost: (vote, id) => dispatch(votePost(vote, id)),
        getComments: (data) => dispatch(getPostComments(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)

