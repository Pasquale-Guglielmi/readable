/**
 * Created by pasquale on 26/08/2017.
 */
import '../styles/home.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostsList from './PostsList'

class Home extends Component {
    render() {
        const {loadingError, categories, loading} = this.props;
        return (
            <div>
                <div className="nav">
                    <ul className="categories">
                        {(loadingError)? <li className="category">Loading Error!</li>
                        : (loading)? <li className="category">Loading...</li>
                        : categories.map((item) => <li key={item.name} className="category">
                            <Link to={`${item.name}`}>{item.name}</Link></li>)}
                    </ul>
                </div>
                <PostsList></PostsList>
            </div>
        )
    }
}

function mapStateToProps({myCategories, isLoading, loadingError}) {
    return {...myCategories, ...isLoading, ...loadingError}
}

function mapDispatchToProps(dispatch) {
    return {
        /*getCategories: () => dispatch(fetchCategories())*/
        /*remove: (data) => dispatch(removeFromCalendar(data))*/
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);