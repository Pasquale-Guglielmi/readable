/**
 * Created by pasquale on 08/09/2017.
 */
/**
 * Created by pasquale on 07/09/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/postsList.css';
import {editPost} from '../actions/posts';
import { Link } from 'react-router-dom';
import '../styles/editDeletePost.css';
import Loading from 'react-loading';

class EditPost extends Component {

    fetchPost() {
        const {match, posts} = this.props
        const id = match.params.id
        const post = posts.filter((item) => item.id === id)[0]
        return post
    }

    editHandler(event) {
        event.preventDefault()
        const post = this.fetchPost()
        const title = this.titleInput.value
        const body = this.bodyInput.value
        const {editPost, history} = this.props
        if((title === post.title) && (body === post.body)) {
            alert("No changes to be submitted")
            return
        }
        const data = {
            title,
            body,
        }
        editPost(data, post.id).then(() => {
            history.push("/")
        })
    }

    render() {
        const {loading} = this.props
        let post = this.fetchPost()
        return(
           <div className="main">
               {(loading)?  <Loading delay={200} type='spin' color='#222' className='loading'></Loading>
                   :(post)? (post.deleted === true)? <div><h1>Sorry, this post was deleted!</h1></div>
                       :<div>
                           <Link className="home-link" to="/">Home</Link>
                           <div className="edit-post-header">
                               <h2>Edit your post before submitting!</h2>
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
                                           defaultValue={(post)? post.title : ""}
                                           ref={(input) => this.titleInput = input}
                                       />
                                   </label>
                                   <label className="edit-input">
                                       Body:
                                       <textarea
                                           required="true"
                                           className="body-input"
                                           defaultValue={(post)? post.body : ""}
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
                       </div>
               : <div><h1>404 Post not found!</h1></div>}
           </div>
        )
    }
}

function mapStateToProps({myPosts}) {
    return {...myPosts}
}

function mapDispatchToProps(dispatch) {
    return {
        editPost: (data, id) => dispatch(editPost(data, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);