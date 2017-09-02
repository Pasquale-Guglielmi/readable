/**
 * Created by pasquale on 27/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Like from 'react-icons/lib/fa/thumbs-up';
import Unlike from 'react-icons/lib/fa/thumbs-down';
import {getPostComments} from '../actions/comments';
import * as Api from '../utils/Api';
import {votePost, editPost} from '../actions/posts';

class PostItem extends Component {
    state = {
        commentsCount: null,
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
        const {votePost} = this.props
    }

    render() {
        const {post, votePost} = this.props
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

                        }}>
                            Edit
                        </button>
                        <button onClick={() => {

                        }}>
                            Delete
                        </button>
                    </div>
                </div>
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

