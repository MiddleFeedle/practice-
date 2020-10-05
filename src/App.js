import React from 'react';
import './App.css';
import * as firebase from 'firebase';

import Home from './pages/home'
import Nav from './components/nav';
import LoginCheck from './pages/logincheck';
import Articles from './pages/articles';
import AddArticle from './pages/addarticle';
import CertainArticle from './pages/certainarticle';
import ArticleEdit from './pages/articleedit';

import LoginDone from './pages/logindone';
import Login from './pages/login';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  var us = "aaa";

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      us = "bbb";
    } else {
      us = "ggg";
    }
  });


    return (

<Router>
<div>
       <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/articles" exact component={Articles} />
          <Route path="/articles/:articleID" component={CertainArticle} />
          <Route path="/edit/:articleID" exact component={ArticleEdit} />
          <Route path="/login" component={LoginCheck} />
          <Route path="/addarticle" component={AddArticle} />
        </Switch>

  </div>
</Router>
    );

  }




export default App;
