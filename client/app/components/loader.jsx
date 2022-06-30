import React from 'react';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: "Chargement..."};
  }

  componentDidMount() {
    var that = this;
    this.timeout = setTimeout(function(){
      that.setState({message: "Il semble y avoir un problème dans le traitement de votre demande. Veuillez réessayer." });
    }, 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render () {
      return(<div className="loader"><div className="loading"></div>
    <p className="help-block">{this.state.message}</p>
      </div>);
  }
}

export default Loader;
