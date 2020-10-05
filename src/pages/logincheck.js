import React from 'react';
import './home.css';
import * as firebase from 'firebase';

import './logincheck.css';

import LoginDone from './logindone';
import Login from './login';
import Reg from './reg';

import 'firebase/auth';

class Logincheck extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      status: [],
      log: 0
    };
  }

  componentDidMount() {

    let newState = [];
    firebase.auth().onAuthStateChanged(user => {
         if (user)
         {
           this.setState({
             status: <LoginDone />,
             log: 1
           });
         }
         else
         {
           this.setState({
             status: <Login />,
             log: 0
           });
         }
     });
    }


statusreg = () =>
{
  if(this.state.log != 1) {
    this.setState({status: <Reg />, log: 0});
  }
}

statuslogin = () =>
{
    if(this.state.log != 1) {

    this.setState({status: <Login />, log: 0});
}
}



render()
{

  return(
<div className = "wide">
    <div className = "rainbow">
        <div className = "forvkl">
        <a onClick={this.statuslogin} className = "signup"></a>
        <a onClick={this.statusreg} title="signin" className = "signup"></a>
        </div>

            {this.state.status}

    </div>
</div>

);
}


}

export default Logincheck;
