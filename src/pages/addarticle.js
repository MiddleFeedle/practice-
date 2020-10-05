import React from 'react';
import './home.css';
import * as firebase from 'firebase';


import ArticleAdding from './articleadding';

class AddArticle extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      status: []
    };
  }

  componentDidMount() {


    const app = firebase.app();
    const db = firebase.firestore();

    const admin = db.collection('admins');

    let newState = [];
    let user

    firebase.auth().onAuthStateChanged(user => {

         if (user)
         {
          var query = null;
          query = admin.where("id", "==", user.uid);

              if(query != null)
               {
                 this.setState({
                   status:
                  < ArticleAdding />
                 });
              }

              else if (query ==  null) {
                this.setState({
                  status: "Вам сюда нельзя!"
                });
              }
            }

         else
         {
           this.setState({
             status: "Войдите в администраторский аккаунт чтобы добавлять статьи!"
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

export default AddArticle;
