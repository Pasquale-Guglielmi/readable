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
import {votePost, deletePost, fetchAllPosts} from '../actions/posts';
import '../styles/postsList.css';
import Modal from 'react-modal';
import Comment from './Comment';
import {addNewComment} from '../actions/comments';
import uuidv1 from 'uuid/v1';
import {openModal,
        closeModal,
        sort} from '../actions/utils';

class PostDetails extends Component {
    state = {
        addCommentModalOpen: false,
    }

    fetchPost() {
        const {match, posts} = this.props
        const id = match.params.id
        const post = posts.filter((item) => item.id === id)[0]
        return post
    }

    update() {
        const {getComments, fetchPosts, match} = this.props;
        fetchPosts().then(() => {
            getComments(match.params.id)
        })
    }

    getPostComments() {
        const post = this.fetchPost()
        const {comments} = this.props
        const postComments = comments.filter((item) => item.parentId === post.id)
        if(postComments.length > 0) {
            return postComments[0].comments
        } else return []
    }

    componentDidMount() {
        this.update()
    }

    /* componentWillReceiveProps(nextProps) {
         if(nextProps.comments !== this.props.comments) {
            this.update(nextProps)
         }
     }*/

    redirect(url) {
        const {history} = this.props
        history.push(url)
    }

    handleSelect(event) {
        const {sortItems} = this.props
        let {value} = event.target
        if (!value) {
            return
        }
        event.preventDefault()
        sortItems(value)
    }

    deleteHandler(id) {
        const {deletePost} = this.props
        this.closeDeleteModal()
        this.redirect("/")
        deletePost(id)
    }


    openDeleteModal = () => {
        const {openModal} = this.props
        const post = this.fetchPost()
        openModal({id: post.id, which: "deletePost"})
    }

    closeDeleteModal() {
        const {closeModal} = this.props
        closeModal()
    }

    addCommentHandler() {
        const {addComment} = this.props
        const post = this.fetchPost()
        const data = {
            id: uuidv1(),
            timestamp: Date.now(),
            body: this.newCommentBody.value,
            author: this.newCommentOwner.value,
            parentId: post.id,
        }
        addComment(data).then(() => {
            this.setState({
                addCommentModalOpen: false,
            })
        })
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
        const post = this.fetchPost()
        const {votePost, modal, sort} = this.props
        const {addCommentModalOpen} = this.state
        const comments = this.getPostComments()
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
                            {(comments) && `${comments.length} comments`}
                        </div>
                        <div>
                            <button
                                className="edit-button"
                                onClick={() => {
                                    this.redirect("/post/" + post.id)
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
                        {(comments !== null && comments.length > 0) &&
                        <div>
                            <h3>Comments</h3>
                            <select onChange={this.handleSelect.bind(this)} className="top-button">
                                <option defaultValue="">Sort comments by</option>
                                <option value="date">date</option>
                                <option value="score">score</option>
                            </select>
                        </div>}
                        <ul className="comments-list">
                            {(comments !== null && comments.length > 0) &&
                                comments.filter((item) => (!item.deleted))
                                    .sort((a, b) => {
                                        switch(sort) {
                                            case "date":
                                                return b.timestamp - a.timestamp;
                                            case "score":
                                                return b.voteScore - a.voteScore;
                                            default:
                                                return b.timestamp - a.timestamp;
                                        }
                                    })
                                    .map((item) => <Comment comment={item} key={item.id} className="comment-item"></Comment>)
                            }
                        </ul>
                    </div>

                    <Modal
                        className='delete-modal'
                        overlayClassName='overlay'
                        isOpen={(modal.open) && (modal.which === "deletePost")}
                        onRequestClose={this.closeDeleteModal}
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
                                    this.closeDeleteModal()
                                }}
                            >No</button>
                        </div>
                    </Modal>
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={addCommentModalOpen}
                        onRequestClose={this.closeAddCommentModal}
                        contentLabel='Modal'
                    >
                        <div className="close-modal-btn">
                            <button
                                className="icon-btn close"
                                onClick={() => {
                                    this.closeAddCommentModal()
                                }}>
                                <Close size={20}></Close>
                            </button>
                        </div>
                        <div className="edit-main">
                            <form
                                className="edit-main"
                                onSubmit={(evt) => {
                                    this.addCommentHandler(evt)
                                }}>
                                <label className="edit-input">
                                    Owner:
                                    <textarea
                                        required="true"
                                        className="title-input"
                                        placeholder="type your name"
                                        ref={(input) => this.newCommentOwner = input}
                                    />
                                </label>
                                <label className="edit-input">
                                    Body:
                                    <textarea
                                        required="true"
                                        className="body-input"
                                        placeholder="comment body"
                                        ref={(input) => this.newCommentBody = input}
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
                </div>
            )
        }else {
            return(<div>Loading post details...</div>)
        }
            }
    }
}

function mapStateToProps({myPosts, myComments, myApp}) {
    let posts = myPosts.posts
    let comments = myComments.commentsList
    return {posts, comments, ...myApp}
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: () => dispatch(fetchAllPosts()),
        openModal: ({id, which}) => dispatch(openModal({id, which})),
        closeModal: () => dispatch(closeModal()),
        deletePost: (id) => dispatch(deletePost(id)),
        votePost: (vote, id) => dispatch(votePost(vote, id)),
        getComments: (data) => dispatch(getPostComments(data)),
        addComment: (data) => dispatch(addNewComment(data)),
        sortItems: (by) => dispatch(sort(by)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)

