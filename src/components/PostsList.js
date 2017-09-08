/**
 * Created by pasquale on 27/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/postsList.css';
import PostItem from './PostItem';
import Loading from 'react-loading';
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

    render() {
        const {loadingError, loading, match, posts, sort} = this.props
        return (
            <div>
                {(!loading) && (
                    <div className="list-top">
                        <div><Link to="/">Home</Link></div>
                        <div><Link to="/post">Add Post</Link></div>
                        <div>
                            <select onChange={this.handleSelect.bind(this)} className="top-button">
                                <option defaultValue="">Sort posts by</option>
                                <option value="date">date</option>
                                <option value="score">score</option>
                            </select>
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
                                        return <li key={post.id} ><PostItem post={post} key={post.title}></PostItem></li>
                                    }
                                } else return <li key={post.id} ><PostItem post={post} key={post.title}></PostItem></li>
                            })}
                    </ul>}
                </div>
            </div>
        )
    }
}

function mapStateToProps({myPosts, myApp}) {
    return {...myPosts, ...myApp}
}

function mapDispatchToProps(dispatch) {
    return {
        sortItems: (by) => dispatch(sort(by)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);