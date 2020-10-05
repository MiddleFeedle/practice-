import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import * as serviceWorker from './serviceWorker';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD15S-R-1-FwhdTGOb6xW_mJXsmH9upG1U",
  authDomain: "chuzovpractice.firebaseapp.com",
  databaseURL: "https://chuzovpractice.firebaseio.com",
  projectId: "chuzovpractice",
  storageBucket: "chuzovpractice.appspot.com",
  messagingSenderId: "11179704566",
  appId: "1:11179704566:web:bea5a08910f387bbb42cd7",
  measurementId: "G-LGNGZZL3M2"
};

firebase.initializeApp(firebaseConfig);





ReactDOM.render(

    <App />,


  document.getElementById('app')
);





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
