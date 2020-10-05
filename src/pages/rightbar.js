import React from 'react';
import * as firebase from 'firebase';

import './rightbar.css';


class RightBar extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      postinfo: [],
      urls: []
    };
  }

  componentDidMount() {
    let newState = [];
    let db = firebase.database();
    const postdata = db.ref('mainpagepostinfo');
    let picurls = [];
    var storageRef = firebase.storage().ref();


    postdata.on('value', (snapshot) =>
    {
        let posts = snapshot.val();
        for(let post in posts)
         {
          storageRef.child('images/' + posts[post].title).getDownloadURL().then((url) => {
            picurls.push({url});
            this.setState({ urls: picurls});
          });

          newState.push({
            id: post,
            title: posts[post].title,
            maintext: posts[post].maintext,
            date: posts[post].date,
            jsdate: posts[post].jsdate,
          });
        }

this.setState({
  postinfo: newState
});


});

    }


  render()
  {

const test = [];
var i = 0;
this.state.urls.map((u) => {
    test[i] = u.url;
    i++;
  });

 // alert(JSON.stringify(test));


    const myData = [].concat(this.state.postinfo)
   .sort((a, b) => a.jsdate < b.jsdate ? 1 : -1);
    return (
<div>

<div className = "col-md-4 sidebar">
      <div className = "sidebar-title-cover">
        <h4 className = "sidebar-title"><span>Горячие новости</span></h4>
          <div className = "rightnews">

          {  myData.map((postinfo, index) => {
              return(
                <div className = "rightnews_item">

                        <div className = "rightnews_item_name"><a href={'/articles/'+postinfo.id}><strong>{postinfo.title}</strong></a>
                        <p className = "smalltext">{postinfo.date}</p>
                        </div>
                        <figure className = "rightbar_pic">

                          <a href={'/articles/'+postinfo.id}>
                              <img alt="img" src={test[index]} alt=""></img>
                          </a>
                        </figure>
                </div>
              )
            }
          )}
        </div>
      </div>
  </div>


</div>

    );

  }

}


export default RightBar;
