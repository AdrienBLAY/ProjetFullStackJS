import React from 'react';
import Login from './login.jsx';
import SearchForm from './searchform.jsx';
import {Link, hashHistory} from 'react-router';
import Alert from 'react-s-alert';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    if(window.localStorage.getItem('userToken')==null) {
      hashHistory.push('login');
    }
  }

  handleLogout() {
    window.localStorage.setItem('userToken','');
    Alert.success("Vous avez été déconnecté avec succès");
  }

  render () {
    var that = this;
    return(
      <div>
      <nav className="navbar container-fluid navbar-default">
          {(window.localStorage.getItem('userToken')) ?
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
              <Link to='home' className="navbar-brand">
                <img src="../assets/logo.png"></img>
              </Link>
          </div>
          :
          <center>
          <a className="navbar-login-logo" href="#">
            <img src="../assets/logo.png"></img>
          </a>
        </center>
        }
          {(window.localStorage.getItem('userToken')) ?
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              {(window.localStorage.getItem('userId')==1) ?
                <li><Link to="admin" className="">Admin
                  </Link>
                </li> :
                ''
              }
             <li><Link to="article/new" className="">Nouvel article
              </Link>
            </li>
            <li>
              <a href="" onClick={this.handleLogout} >Déconnexion</a>
            </li>
            </ul>
            <SearchForm />
          </div>
          : <div/>}
      </nav>
        <div className="content container">
          {that.props.children}
          </div>
           <Alert stack={{limit: 3}} position='bottom'/>
    </div>

  );
  }
}

export default App;
