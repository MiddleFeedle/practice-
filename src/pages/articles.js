import React from 'react';
import * as firebase from 'firebase';

import './articles.css';

import Addbutton from './addbutton'
import RightBar from './rightbar'

class Articles extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      postinfo: [],
      edit: false
    };


  }

  delete(title)
  {
alert(title);
    const db = firebase.database();
    const path = "postinfo/"+title;
    const postdata = db.ref(path);
    postdata.remove();

    var storageRef = firebase.storage().ref();
    var ref = storageRef.child('images/'+title);
  ref.delete().then(function() {


  // File deleted successfully
}).catch(function(error) {
  // Uh-oh, an error occurred!
});


  }

  componentDidMount() {
    let newState = [];
    let db = firebase.database();
    const postdata = db.ref('postinfo');

    postdata.on('value', (snapshot) =>
    {
        let posts = snapshot.val();
        for(let post in posts)
        {
          newState.push({
            id: post,
            title: posts[post].title,
            maintext: posts[post].maintext,
            date: posts[post].date,
            jsdate: posts[post].jsdate
          });
        }

this.setState({
  postinfo: newState
});
});



const app = firebase.app();
db = firebase.firestore();
const admin = db.collection('admins');


firebase.auth().onAuthStateChanged(user => {
     if (user)
     {

       var query = null;
       query = admin.where("id", "==", user.uid).get()
.then(snapshot => {

            if (snapshot.empty){
             this.setState({
               edit: false
             });
           }

           else {
            this.setState({
              edit: true
            });
          }



        });
      }
    }); }


  render()
  {

    const myData = [].concat(this.state.postinfo)
   .sort((a, b) => a.jsdate < b.jsdate ? 1 : -1);


    return (
<div className = "row">
<div className = "container">
<div className = "col-md-8 abut">
  <Addbutton />
  </div>


<div className = "col-md-8 maindiv">
      <div className = "newsbar">
      <table border="1" className = "newstable">
<caption>Последние новости на сайте:</caption>

          {

    myData.map((postinfo) => {
            if(this.state.edit == false)
            {
              return(
                <tr>
                        <th><p>{postinfo.date}</p></th>
                        <th><a href={'/articles/'+postinfo.id}>{postinfo.title}</a></th>
                </tr>
              )
            }
            else
            {
              return(
                <tr>
                        <th><p>{postinfo.date}</p></th>
                        <th><a href={'/articles/'+postinfo.id}>{postinfo.title}</a></th>
                        <th><a href={'/edit/'+postinfo.id}>Редактировать</a></th>
                        <th><button onClick={() => this.delete(postinfo.title)} className="btn btn-primary">Удалить</button></th>

                </tr>
              )

            }
          })}
        </table>
      </div>
  </div>
  <RightBar />
  </div>
  </div>

    );

  }

}


export default Articles;
