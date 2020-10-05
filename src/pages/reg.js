import React from 'react';
import './login.css';
import * as firebase from 'firebase';

class Reg extends React.Component {

  constructor (props) {
    super(props);

    this.ermessage = React.createRef();

    this.state = {
      email: null,
      password: null,
      reppassword: null,
      error: null,
    };

        this.handleClick = this.handleClick.bind(this);

  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }


checkpass = () =>
{
    if(this.state.password == this.state.reppassword) {this.handleClick();}
    else {
       var mes = "Пароли не совпадают!";
      this.setState({error : mes});
        }

}

  handleClick()
  {
    var mes;
firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  mes = errorMessage;
  this.setState({error : mes});
  // ...
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

    <div>
      <input type="password" className="inp" name="reppassword"
        placeholder="Confirm password"
        value={this.state.reppassword}
        onChange={this.handleUserInput}  />
    </div>

  </form>

  <div className = "forbtn">
  <a onClick={this.checkpass} class="myButton">Зарегаться</a>
  </div>

    <div className = "error">
        <h3 className = "errormessage"> {this.state.error} </h3>   </div>
</div>
  </div>

)
}




}


export default Reg;
