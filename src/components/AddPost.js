/**
 * Created by pasquale on 07/09/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/postsList.css';
import uuidv1 from 'uuid/v1';
import {addNewPost, editPost} from '../actions/posts';

class AddPost extends Component {

    addPostHandler(evt) {
        evt.preventDefault()
        const {addNewPost, history} = this.props
        const data = {
            id: uuidv1(),
            timestamp: Date.now(),
            title: this.newPostTitle.value,
            body: this.newPostBody.value,
            author: this.newPostAuthor.value,
            category: this.newPostCategory.value
        }
        addNewPost(data).then(() => {
            history.push("/")
        })
    }

    render() {
        return(
            <div>
                <div className="edit-post-header">
                    <h2>Please fill all the fields to add a new post!</h2>
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
            </div>
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
        addNewPost: (data) => dispatch(addNewPost(data)),
    }
}

export default connect(null, mapDispatchToProps)(AddPost);