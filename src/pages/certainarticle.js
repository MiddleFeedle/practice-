import React from 'react';
import './certainarticle.css';
import * as firebase from 'firebase';
import RightBar from './rightbar'



class CertainArticle extends React.Component

{
  constructor(props) {
    super(props);

    this.state = {
      postinfo: [],
      picurl: null,
    };
  }

  componentDidMount() {

    let newState = [];
    const db = firebase.database();
    const path = "postinfo/"+this.props.match.params.articleID;
    var storageRef = firebase.storage().ref();

    const postdata = db.ref(path);

     storageRef.child('images/' + this.props.match.params.articleID).getDownloadURL().then((url) => {
       this.setState({picurl: url});
     });


    postdata.on('value', (snapshot) =>
    {
        let data = snapshot.val();

          newState.push({
            id: data,
            title: data.title,
            maintext: data.maintext,
            date: data.date
          });

this.setState({
  postinfo: newState
});
});

  }

  render()
  {


    return (
    <div className = "row">
    <div className = "container">
    <div className = "col-md-8 maindiv">


          {this.state.postinfo.map((postinfo) => {

              return(

                <article className = "section_margin">
                <figure className = "alith_news_img animate-box fadeInUp animated-fast">
                        <img className = "artpic"src={this.state.picurl}></img>
                </figure>

                <div className = "post-content">
                <div className = "single_header">
                    <h3 className = "alith_post_title">{postinfo.title}</h3>

                </div>

                  <div className = "single-content animate-box fadeInUp animated-fast">
                      <div className = "dropcap column-2 animate-box fadeInUp animated-fast">
                        <p className = "maintext">{postinfo.maintext}</p>
                      </div>
                  </div>

                </div>

                </article>

              )


          })}


          </div>
    <RightBar />
    </div>
    </div>

    );
}

}

export default CertainArticle;
