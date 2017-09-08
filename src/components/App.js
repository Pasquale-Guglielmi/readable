import React, { Component } from 'react';
import Home from './Home';
import { Route, Switch } from 'react-router-dom';
import PostsList from './PostsList';
import PostDetails from './PostDetails';
import AddPost from './AddPost';
import EditPost from './EditPost';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
            <Route path='/post/:id' component={EditPost}/>
            <Route path='/post' component={AddPost}/>
            <Route exact path='/' component={Home}/>
            <Route exact path='/:category' component={PostsList}/>
            <Route exact path='/:category/:id' component={PostDetails}/>
        </Switch>
      </div>
    )
  }
}

export default App

