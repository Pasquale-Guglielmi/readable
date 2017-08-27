/**
 * Created by pasquale on 26/08/2017.
 */
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import {fetchCategories} from '../actions/categories';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

store.dispatch(fetchCategories());

export default store
