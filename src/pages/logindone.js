import React from 'react';
import './login.css';
import * as firebase from 'firebase';


class LoginDone extends React.Component
{

  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick()
  {

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });

  }

  render() {
  return (

    <div className = "loginform">
    <h1>You are already logged in</h1>
    <div>

      <button onClick = {this.handleClick}>Выйти</button>
    </div>

    </div>

  );
}
}


export default LoginDone;
