import React from 'react';
import './articleadding.css';
import './login.css';
import * as firebase from 'firebase';


class ArticleAdding extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      title: 'testtitle',
      maintext: 'testtext',
      img: null,
      mainpage: false
    };

        this.handleClick = this.handleClick.bind(this);
        this.handlePicUpload = this.handlePicUpload.bind(this);

        this.handleCheckBox = this.handleCheckBox.bind(this);
  }


  handleCheckBox = (e) => {
      if(this.state.mainpage == true) {this.state.mainpage = false;}

      else {this.state.mainpage = true;}
  }

  handlePicUpload = (e) => {
    const value = e.target.value;
    if(e.target.files[0].type != 'image/png' && e.target.files[0].type != 'image/jpg') {
    alert("Неправильный тип файла!");
    this.setState({img: null});
  }

  else {
    this.setState({img: e.target.files[0]});
  }
}

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  handleClick()
  {

 var d = new Date();
 var timestamp = d.getTime();
 var day = d.getDate();
 var month = d.getMonth() + 1;
 var year = d.getFullYear();

 if(this.state.title != null && this.state.maintext != null && this.state.img != null) {

   var jsdate = new Date();
  firebase.database().ref('postinfo/' + this.state.title).set({
    title: this.state.title,
    maintext: this.state.maintext,
    date: day+"."+month+"."+year,
    jsdate: timestamp
  });

  if(this.state.mainpage == true)
  {
    var jsdate = new Date();

    firebase.database().ref('mainpagepostinfo/' + this.state.title).set({
      title: this.state.title,
      maintext: this.state.maintext,
      date: day+"."+month+"."+year,
      jsdate: timestamp
    });
  }


  var storageRef = firebase.storage().ref();


  var file = this.state.img;

    var metadata = {
    contentType: this.state.img.type,
  };

  var uploadTask = storageRef.child('images/' + this.state.title).put(file, metadata);

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {

    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

      case 'storage/canceled':
        // User canceled the upload
        break;

      case 'storage/unknown':
          alert("storage/unknown");
        break;
    }
  }, function() {
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      alert('File available at', downloadURL);
    });
  });

}

else {
  alert("error");
}

  }

  render() {
      return(
    <div>
    <div className = "container">
    <form className="articleaddingform">


    <div>
      Title
      <input type="text" required className="form-control" name="title"
        placeholder="Заголовок статьи"
        value={this.state.title}
        onChange={this.handleUserInput}  />
    </div>
    <br />
    <div>
      Text
      <textarea type="textarea" height="300px" className="form-control bigtext" name="maintext"
        placeholder="Содержимое статьи"
        value={this.state.maintext}
        onChange={this.handleUserInput}  />
    </div>
    <br />

    <div>
        Картинка (jpeg/png)
        <input type="file" name="image" id="articleimg" class="" accept=".png,.jpg" onChange = {this.handlePicUpload}/>
    </div>

<br />
    <div>
      Статья для главной страницы(очень интересная).
      <input type="checkbox" name="mainpage" onChange={this.handleCheckBox}/>
    </div>
    <br /> <br />
  </form>
  <button onClick={this.handleClick} className="btn btn-primary">Отправить статью!</button>
  </div>
  </div>

)
}




}

export default ArticleAdding;
