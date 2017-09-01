/**
 * Created by pasquale on 27/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Like from 'react-icons/lib/fa/thumbs-up';
import Unlike from 'react-icons/lib/fa/thumbs-down';
import {getComments} from '../actions/comments';
import {loadingComments, loadingCommentsError} from '../actions/loading'
import * as Api from '../utils/Api';

class PostItem extends Component {
    state = {
        commentsCount: null,
    }

    componentDidMount() {
        const {post, setComments, loadingComments, loadingCommentsError} = this.props
        loadingComments(true)
        Api.getPostComments(post.id).then((items) => {
                setComments({comments: items, parentId: post.id})
                this.setState({
                    commentsCount: items.length
                })
                loadingComments(false)
            },
            (err) => {
                loadingComments(false)
                loadingCommentsError(true)
            })
    }

    render() {
        const {post} = this.props
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
                            onClick={this.searchFood}>
                            <Like size={20}/>
                        </button>
                        <button
                            className='icon-btn'
                            onClick={this.searchFood}>
                            <Unlike size={20}/>
                        </button>
                    </div>
                    <div className="comments-count">
                        {(this.state.commentsCount !== null) && `${this.state.commentsCount} comments`}
                    </div>
                </div>
            </li>
        )
    }
}

function mapStateToProps({myComments}) {
    return {myComments}
}

function mapDispatchToProps(dispatch) {
    return {
        setComments: (data) => dispatch(getComments(data)),
        loadingComments: (data) => dispatch(loadingComments(data)),
        loadingCommentsError: (data) => dispatch(loadingCommentsError(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)
