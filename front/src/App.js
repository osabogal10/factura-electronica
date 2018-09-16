import React, {Component} from 'react';
import './style/App.css';
import './style/Navbar.css';
import NavBar from './components/Navbar';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Signup from './components/Signup';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      navbar: 'index',
      location: 'Home',
      facturas: [],
      productos: [],
      idUser: null,


    };

    //Funciones
    this.callbackNavbar = this.callbackNavbar.bind(this);
  }

  callbackNavbar(value) {
    this.setState({location: value});
  }



  render() {

    let navbar = <NavBar onChange={this.callbackNavbar} onLoginClick={this.handleLoginClick} onSignUpClick={this.handleSignUpClick}/>;
    let inicio;
    if(this.state.location === 'Home') {
      inicio = <Inicio/>;
    } else if(this.state.location === 'Login'){
      inicio = <Login/>;
    } else if(this.state.location === 'Signup'){
      inicio = <Signup/>;
    }

    return (
      <div className="App">
        <div>
          {navbar}
        </div>
        {inicio}
      </div>
    );
  }
}

export default App;