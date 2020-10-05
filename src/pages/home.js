import React from 'react';
import './home.css';
import * as firebase from 'firebase';
import Slider from "react-slick";
class Home extends React.Component


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

  render() {

    const test = [];
    var i = 0;
    this.state.urls.map((u) => {
        test[i] = u.url;
        i++;
      });

      const myData = [].concat(this.state.postinfo).sort((a, b) => a.jsdate < b.jsdate ? 1 : -1);


     const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  draggable: true
};
  return (
<div>
    <h1 className = "maintitle">ДОМАШНЯЯ СТРАНИЦА</h1>

  <h2 className = "slidertitle"> (слайдер в доработке) </h2>
<div className = "container sliderfull">
        <Slider {...settings}>
              {  myData.map((postinfo, index) => {
                  return(
                      <div className= "sliderpart">
                              <a href={'/articles/'+postinfo.id}>
                                <img className = "artpic" alt="img" src={test[index]} alt=""></img>
                              </a>
                                  <div className = "info">
                                          <div className = "title">
                                              <a href={'/articles/'+postinfo.id}><strong>{postinfo.title}</strong></a>
                                          </div>

                                          <div className = "meta">
                                              <span className = "date">{postinfo.date}</span>
                                              <a className = "readmore" href={'/articles/'+postinfo.id}>Read More -> </a>
                                          </div>
                            </div>
                      </div>
              )})}
</Slider>
</div>
</div>

  );
}

}

export default Home;
