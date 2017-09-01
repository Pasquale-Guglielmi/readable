/**
 * Created by pasquale on 27/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/postsList.css';
import PostItem from './PostItem';
import Loading from 'react-loading';

class PostsList extends Component {
    render() {
        const {loadingError, loading, posts} = this.props
        return (
            <div className="posts-container">
                {(loading)? <Loading delay={200} type='spin' color='#222' className='loading'></Loading>
                    : (loadingError)? <div>Error loading posts!</div>
                    :((posts.length === 0) && (!loading))? <div>No Posts Found!</div>
                    :<ul className="posts-list">
                        {posts.map((post) => <PostItem post={post} key={post.id}></PostItem>)}
                    </ul>}
            </div>
        )
    }
}

function mapStateToProps({myPosts}) {
    return {...myPosts}
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsList);