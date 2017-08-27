/**
 * Created by pasquale on 26/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        const {loadingError, categories} = this.props;
        return (
            <div>
                <div className="nav">
                    <ul className="categories">
                        {(loadingError)? <li className="category">Loading Error!</li>
                        : (categories)? categories.map((item) => <li key={item.name} className="category"><Link to={`${item.name}`}>{item.name}</Link></li>)
                        : <li className="category">loading</li>}
                    </ul>
                </div>
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