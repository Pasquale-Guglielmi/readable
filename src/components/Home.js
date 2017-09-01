/**
 * Created by pasquale on 26/08/2017.
 */
import '../styles/home.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostsList from './PostsList';
import Loading from 'react-loading';

class Home extends Component {
    render() {
        const {errorLoading, categories, loading} = this.props;
        return (
            <div>
                {
                    (loading)? <Loading delay={200} type='spin' color='#222' className='loading'></Loading>
                        : (errorLoading)? <div>Error occurred while loading content!</div>
                        : <div className="nav">
                            <ul className="categories">
                                {
                                    categories.map((item) => <li key={item.name} className="category">
                                        <Link to={`${item.name}`}>{item.name}</Link>
                                    </li>)
                                }
                            </ul>
                        </div>
                }
                {<PostsList></PostsList>}
            </div>
        )
    }
}

function mapStateToProps({myCategories}) {
    return {...myCategories}
}

function mapDispatchToProps(dispatch) {
    return {
        /*getCategories: () => dispatch(fetchCategories())*/
        /*remove: (data) => dispatch(removeFromCalendar(data))*/
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);