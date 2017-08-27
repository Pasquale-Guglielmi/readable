/**
 * Created by pasquale on 27/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PostsList extends Component {
    render() {
        return (
            <div>hola</div>
        )
    }
}

function mapStateToProps({myCategories, isLoading, loadingError}) {
    return {...isLoading, ...loadingError}
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsList);