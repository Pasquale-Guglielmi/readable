/**
 * Created by pasquale on 26/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchCategories} from '../actions/categories';

class Home extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="nav">
                    <ul className="categories">
                        oooo
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps({myCategories}) {
    return {
        categories: myCategories.reduce((result, category) => {
            result.push(category.name)
            return result
        }, [])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(fetchCategories())
        /*remove: (data) => dispatch(removeFromCalendar(data))*/
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);