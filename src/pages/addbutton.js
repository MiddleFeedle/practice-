import React from 'react';
import './home.css';
import * as firebase from 'firebase';


import 'firebase/auth';

class Addbutton extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      status: [],
      admin: []
    };
  }

  componentDidMount() {


    const app = firebase.app();
    const db = firebase.firestore();

    const admin = db.collection('admins');

    let newState = [];

    firebase.auth().onAuthStateChanged(user => {

         if (user)
         {

          var query = null;
          query = admin.where("id", "==", user.uid).get()
  .then(snapshot => {

               if (snapshot.empty){
                this.setState({
                  status: "Приятного чтения!"
                });
              }

            else
             {
               this.setState({
                 status:
                 <div>
                 Вход выполнен с администраторского аккаунта!
                 <form action="/addarticle">
                     <input type="submit" value="Добавить статью!" />
                 </form>
                 </div>
               });
            }
          });
        }


         else
         {
           this.setState({
             status: "Войдите или зарегестрируйтесь чтобы добавлять комментарии и в целом радоваться жизни!"
           });
         }
     });
    }


render()
{

  return(

              <div>
                  {this.state.status}
              </div>
);
}


}

export default Addbutton;
