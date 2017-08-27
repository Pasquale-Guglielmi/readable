/**
 * Created by pasquale on 27/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/postsList.css';
import PostItem from './PostItem';

class PostsList extends Component {
    render() {
        const {loadingError, loading, posts} = this.props
        return (
            <div className="posts-container">
                {((posts.length === 0) && (!loading))? <div>No Posts Found!</div>
                : <ul className="posts-list">
                    {posts.map((post) => <PostItem post={post} key={post.id}></PostItem>)}
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