require('./styles/index.scss');

import React from 'react'
import {render} from 'react-dom'
import {Provider} from  'react-redux'
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {initStore} from './stores/index'

import App from './containers/App'
import Home from './containers/Home';
import Gallery from './containers/Gallery';
import Tools from './containers/Tools';
import About from './containers/About';

let store = initStore();
var rootElement = document.getElementById('app');


render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/home" component={Home}></Route>
        <Route path="/gallery" component={Gallery}></Route>
        <Route path="/tools" component={Tools}></Route>
        <Route path="/about" component={About}></Route>
        <IndexRoute component={Home}/>
      </Route>
    </Router>
  </Provider>,
  rootElement
  );
