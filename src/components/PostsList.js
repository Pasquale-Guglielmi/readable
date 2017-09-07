/**
 * Created by pasquale on 27/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/postsList.css';
import PostItem from './PostItem';
import Loading from 'react-loading';
import Close from 'react-icons/lib/fa/close';
import Modal from 'react-modal';
import uuidv1 from 'uuid/v1';
import {addNewPost,
        openAddPostModal,
        closeAddPostModal} from '../actions/posts';
import {sort} from '../actions/utils';

class PostsList extends Component {

    handleSelect(event) {
        const {sortItems} = this.props
        let {value} = event.target
        if (!value) {
            return
        }
        event.preventDefault()
        sortItems(value)
    }

    addPostHandler(evt) {
        evt.preventDefault()
        const {addNewPost, closeAddPostModal} = this.props
        const data = {
            id: uuidv1(),
            timestamp: Date.now(),
            title: this.newPostTitle.value,
            body: this.newPostBody.value,
            author: this.newPostAuthor.value,
            category: this.newPostCategory.value
        }
        addNewPost(data).then(() => {
            closeAddPostModal()
        })
    }

    render() {
        const {loadingError, loading, match, posts, addPostModalOpen, openAddPostModal, closeAddPostModal, sort} = this.props
        return (
            <div>
                {(!loading) && (
                    <div className="list-top">
                        <div><Link to="/">Home</Link></div>
                        <div>
                            <select onChange={this.handleSelect.bind(this)} className="top-button">
                                <option defaultValue="">Sort posts by</option>
                                <option value="date">date</option>
                                <option value="score">score</option>
                            </select>
                            <button
                                className="top-button"
                                onClick={() => {openAddPostModal()}}
                            >Add Post</button>
                        </div>

                    </div>
                )}
                <div className="posts-container">
                    {(loading)? <Loading delay={200} type='spin' color='#222' className='loading'></Loading>
                        : (loadingError)? <div>Error loading posts!</div>
                        :((posts.length === 0) && (!loading))? <div>No Posts Found!</div>
                        :<ul className="posts-list">
                            {posts.sort((a, b) => {
                                switch(sort) {
                                    case "date":
                                        return b.timestamp - a.timestamp;
                                    case "score":
                                        return b.voteScore - a.voteScore;
                                    default:
                                        return b.timestamp - a.timestamp;
                                }
                            }).map((post) => {
                                if(match) {
                                    if(match.params.category === post.category) {
                                        return <li key={post.id} ><PostItem post={post} key={post.id}></PostItem></li>
                                    }
                                } else return <li key={post.id} ><PostItem post={post} key={post.id}></PostItem></li>
                            })}
                    </ul>}
                </div>
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={addPostModalOpen}
                    onRequestClose={closeAddPostModal}
                    contentLabel='Modal'
                >
                    <div className="close-modal-btn">
                        <button
                            className="icon-btn close"
                            onClick={() => {
                                closeAddPostModal()
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
    }
}

function mapStateToProps({myPosts, myApp}) {
    return {...myPosts, ...myApp}
}

function mapDispatchToProps(dispatch) {
    return {
        addNewPost: (data) => dispatch(addNewPost(data)),
        openAddPostModal: () => dispatch(openAddPostModal()),
        closeAddPostModal: () => dispatch(closeAddPostModal()),
        sortItems: (by) => dispatch(sort(by)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);