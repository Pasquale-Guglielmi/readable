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
    state = ({
        sort: "",
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

    render() {
        const {loadingError, loading, posts, match} = this.props
        const {sort} = this.state
        return (
            <div>
                <div className="list-top">
                    <div><Link to="/">Home</Link></div>
                    {(!loading) && (
                        <select onChange={this.handleSelect.bind(this)}>
                            <option defaultValue="">Sort posts by</option>
                            <option value="date">date</option>
                            <option value="score">score</option>
                        </select>
                    )}
                </div>
                <div className="posts-container">
                    {(loading)? <Loading delay={200} type='spin' color='#222' className='loading'></Loading>
                        : (loadingError)? <div>Error loading posts!</div>
                        :((posts.length === 0) && (!loading))? <div>No Posts Found!</div>
                        :<ul className="posts-list">
                            {posts.sort(function(a, b) {
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
            </div>
        )
    }
}

function mapStateToProps({myPosts}) {
    return {...myPosts,
        posts: myPosts.posts.filter((post) => (!post.deleted))}
}

export default connect(mapStateToProps, null)(PostsList);