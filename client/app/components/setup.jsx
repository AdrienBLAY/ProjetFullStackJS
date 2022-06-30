import React from 'react';
import {hashHistory} from 'react-router';
import Loader from './loader.jsx';
import Alert from 'react-s-alert';

class Setup extends React.Component {

  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp() {
    var user = {
      name: encodeURIComponent(this.refs.user_name.value),
      about: encodeURIComponent(this.refs.user_about.value),
      email: encodeURIComponent(this.refs.user_email.value),
      password: encodeURIComponent(this.refs.user_password.value)
    };
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
    });
    var myInit = { method: 'POST',
               headers: myHeaders,
               body: "name="+user.name+"&about="+user.about+"&email="+user.email+"&password="+user.password
               };
    var that = this;
    fetch('/setup',myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
          Alert.success('Admin user generated');
          hashHistory.push('login');
      }
    });
  }


  render () {
    return(
      <div className=" setup-form container">
      <div className="row">

        <div className="col-md-6">
          <h1><b>Bienvenue,</b></h1>
          <h3>Voici le wiki de Jérôme De Vivo et Adrien Blay.</h3><br/>
          <br/>


        </div>
      <div className="col-md-6">
        <form>
          <div className="col-sm-12 form-group">
            <input type="text" className="form-control" ref="user_name" id="inputUserName" placeholder="Nom" />
          </div>
          <div className="col-sm-12 form-group">
            <input type="text" className="form-control" ref="user_about" id="inputUserAbout" placeholder="A propos" />
          </div>
      <div className="col-sm-12 form-group">
        <input type="email" className="form-control" ref="user_email" id="inputUserEmail" placeholder="Email" />
      </div>
      <div className="col-sm-12 form-group">
        <input type="password" className="form-control" ref="user_password" id="inputUserPassword" placeholder="Password" />
      </div>
      <div className="col-sm-12 form-group">
        <button onClick={this.handleSignUp} className="btn btn-default btn-block btn-lg">Créer mon compte admin</button>
      </div>
    </form>
      </div>
        </div>

  </div>);
  }
}

export default Setup;
