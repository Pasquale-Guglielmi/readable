/**
 * Created by pasquale on 27/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/postsList.css';
import Like from 'react-icons/lib/fa/thumbs-up';
import Unlike from 'react-icons/lib/fa/thumbs-down';

class PostsList extends Component {
    render() {
        const {loadingError, loading, posts} = this.props
        return (
            <div className="posts-container">
                {(posts.length === 0)? <div>No Posts Found!</div>
                : <ul className="posts-list">
                    {posts.map((post) => {
                        return (
                            <li key={post.id} className="post-item">
                                <div className="post-top">
                                    <h2>{post.title}</h2>
                                    <p> by <strong>{post.author}</strong></p>
                                </div>
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
                            </li>
                        )
                    })}
                </ul>}
            </div>
        )
    }
}

function mapStateToProps({myPosts, isLoading, loadingError}) {
    return {...isLoading, ...loadingError, ...myPosts}
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsList);