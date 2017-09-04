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
import {addNewPost} from '../actions/posts'

class PostsList extends Component {
    state = ({
        sort: "",
        addPostModalOpen: false,
    })

    handleSelect(event) {
        let {value} = event.target
        if (!value) {
            return
        }
        event.preventDefault()
        this.setState({
            sort: value,
        })
    }

    openAddPostModal = () => {
        this.setState({
            addPostModalOpen: true,
        })
    }

    closeAddPostModal = () => {
        this.setState({
            addPostModalOpen: false,
        })
    }

    addPostHandler(evt) {
        evt.preventDefault()
        const {addNewPost} = this.props
        const data = {
            id: uuidv1(),
            timestamp: Date.now(),
            title: this.newPostTitle.value,
            body: this.newPostBody.value,
            author: this.newPostAuthor.value,
            category: this.newPostCategory.value
        }
        addNewPost(data).then(() => {
            alert("Post added successfully!")
        })
    }

    render() {
        const {loadingError, loading, match, posts} = this.props
        const {sort, addPostModalOpen} = this.state
        let postsToShow = posts.filter((post) => !post.deleted)
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
                                onClick={() => {this.openAddPostModal()}}
                            >Add Post</button>
                        </div>

                    </div>
                )}
                <div className="posts-container">
                    {(loading)? <Loading delay={200} type='spin' color='#222' className='loading'></Loading>
                        : (loadingError)? <div>Error loading posts!</div>
                        :((postsToShow.length === 0) && (!loading))? <div>No Posts Found!</div>
                        :<ul className="posts-list">
                            {postsToShow.sort(function(a, b) {
                                if(sort === "date") {
                                    return b.timestamp - a.timestamp
                                }else if(sort === "score") {
                                    return b.voteScore - a.voteScore
                                }
                            }).map((post) => {
                                if(match) {
                                    if(match.params.category === post.category) {
                                        return <PostItem post={post} key={post.id}></PostItem>
                                    }
                                } else return <PostItem post={post} key={post.id}></PostItem>
                            })}
                    </ul>}
                </div>
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={addPostModalOpen}
                    onRequestClose={this.closeAddPostModal}
                    contentLabel='Modal'
                >
                    <div className="close-modal-btn">
                        <button
                            className="icon-btn close"
                            onClick={() => {
                                this.closeAddPostModal()
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

function mapStateToProps({myPosts}) {
    return {...myPosts}
}

function mapDispatchToProps(dispatch) {
    return {
        addNewPost: (data) => dispatch(addNewPost(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);