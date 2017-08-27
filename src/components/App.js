import React, { Component } from 'react';
import '../styles/App.css';
import Home from './Home';
import { Route } from 'react-router-dom';
import * as Api from '../utils/Api';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Home}/>
      </div>
    )
  }
}

export default App

/*Api.getCategories().then((res) => console.log(res))*/

/*Api.getCategoryPosts('react').then((res) => console.log(res))*/

/*Api.getPosts().then((res) => console.log(res))*/

Api.getPost('8xf0y6ziyjabvozdd253nd').then((res) => console.log(res))

/*Api.editPost({title: 'React is so awesoome!!!', body: 'Yes, it is'}, '1503770062658')*/

Api.getPostComments('8xf0y6ziyjabvozdd253nd').then((res) => console.log(res))

/*Api.getCommentDetails("894tuq4ut84ut8v4t8wun89g").then((res) => console.log(res))*/

/*Api.voteComment("upVote","894tuq4ut84ut8v4t8wun89g")*/

