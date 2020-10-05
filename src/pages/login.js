import React from 'react';
import './login.css';
import * as firebase from 'firebase';

import LoginDone from './logindone';

class Login extends React.Component {

  constructor (props) {
    super(props);

    this.ermessage = React.createRef();

    this.state = {
      email: null,
      password: null,
      error: null,
      form: null
    };

        this.handleClick = this.handleClick.bind(this);

  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  googlelogin()
  {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {

    }).catch(function(error) {
            var errorMessage = error.message;
            this.setState({error : errorMessage});
    });


  }


  handleClick()
  {
    var mes;
  firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  mes = errorMessage;
  this.setState({error : mes});

});


  }


  render() {
      return(
<div className = "maindiv">
  <div className = "loginform">

  <form className="">

    <div>
      <input type="email" className="inp email" name="email"
        placeholder="E-mail"
        value={this.state.email}
        onChange={this.handleUserInput}  />
    </div>
    <div>
      <input type="password" className="inp" name="password"
        placeholder="Password"
        value={this.state.password}
        onChange={this.handleUserInput}  />
    </div>
  </form>

  <div className = "forbtn">
  <a onClick={this.handleClick} class="myButton">Войти</a>
  </div>

  <div className = "forbtn">
  <a onClick={this.googlelogin} class="myButton">Вход через google</a>
  </div>

    <div className = "error">
        <h3 className = "errormessage"> {this.state.error} </h3>   </div>
</div>
  </div>

)
}




}


export default Login;
