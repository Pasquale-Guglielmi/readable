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
import * as Api from '../utils/Api';
import {votePost, editPost} from '../actions/posts';
import Modal from 'react-modal';

class PostItem extends Component {
    state = {
        commentsCount: null,
        editModalOpen: false,
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

    editHandler() {
        console.log(this.titleInput.value + this.bodyInput.value)
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

    render() {
        const {post, votePost} = this.props
        const {editModalOpen} = this.state
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
                        <button onClick={() => {
                            this.openEditModal()
                        }}>
                            Edit
                        </button>
                        <button onClick={() => {

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
                    <button
                        className="icon-btn close"
                        onClick={() => {
                            this.closeEditModal()
                        }}>
                        <Close size={20}></Close>
                    </button>
                    <div className="edit-main">
                        <label className="edit-input">
                            Title:
                            <textarea
                                className="title-input"
                                defaultValue={post.title}
                                ref={(input) => this.titleInput = input}
                            />
                        </label>
                        <label className="edit-input">
                            Body:
                            <textarea
                                className="body-input"
                                defaultValue={post.body}
                                ref={(input) => this.bodyInput = input}
                            />
                        </label>
                        <button
                            className="edit-submit"
                            onClick={() => {
                                this.editHandler()
                            }}>
                            Submit
                        </button>
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
        editPost: (data, id) => dispatch(editPost(data, id)),
        votePost: (vote, id) => dispatch(votePost(vote, id)),
        setComments: (data) => dispatch(getPostComments(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)

