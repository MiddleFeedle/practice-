import React from 'react';
import './articleadding.css';

import './home.css';
import * as firebase from 'firebase';



class ArticleEdit extends React.Component

{
  constructor(props) {
    super(props);

    this.state = {
     id: "",
     title: "",
     maintext: "",
     date: "",
     exist: true
    };
    this.handleClick = this.handleClick.bind(this);

  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }


  handleClick()
  {

const path = "postinfo/" + this.state.id;
  firebase.database().ref(path).set({
    title: this.state.title,
    maintext: this.state.maintext,
    date: this.state.date
  });
}



  componentDidMount() {

    let newState = [];
    const db = firebase.database();
    const path = "postinfo/"+this.props.match.params.articleID;

    const postdata = db.ref(path);

    postdata.on('value', (snapshot) =>
    {
        let data = snapshot.val();
        if(data==null) { this.setState({exist: false});}
        else {
        this.setState({
          id: this.props.match.params.articleID,
          title: data.title,
          maintext: data.maintext,
          date: data.date
        });}
});

  }

  render() {
    if(this.state.exist == false)
    {
      return(<div>Такой записи не существует!</div>)
    }
    else {
      return(
    <div>
    <div className = "container">

    <form className="articleaddingform">
    <div>
      title
      <input type="text" required className="form-control" name="title"
        placeholder={this.state.title}
        value={this.state.title}
        onChange={this.handleUserInput}  />
    </div>
    <br />
    <div>
      maintext
      <textarea type="text" height="300px" className="form-control bigtext" name="maintext"
        placeholder={this.state.maintext}
        value={this.state.maintext}
        onChange={this.handleUserInput}  />
    </div>
  </form>
  <br /><br />
  <button onClick={this.handleClick} className="btn btn-primary">Отправить статью!</button>
  </div>
  </div>

)
}
}
}

export default ArticleEdit;
