/**
 * Created by pasquale on 26/08/2017.
 */
import { combineReducers } from 'redux'
import myPosts from './posts'
import myApp from './app'
import myComments from './comments'
import myCategories from './categories'

export default combineReducers({
    myCategories: myCategories,
    myPosts: myPosts,
    myComments: myComments,
    myApp: myApp,
})