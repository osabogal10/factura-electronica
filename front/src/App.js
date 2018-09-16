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
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  callbackNavbar(value) {
    this.setState({location: value});
  }

  handleLoginClick(){
    this.setState({location: 'Login'});
  }



  render() {

    let navbar = <NavBar onChange={this.callbackNavbar}/>;
    let inicio;
    if(this.state.location === 'Home') {
      inicio = <Inicio/>;
    } else if(this.state.location === 'Login'){
      inicio = <Login onChange={this.callbackNavbar}/>;
    } else if(this.state.location === 'Signup'){
      inicio = <Signup onSubmitClick = {this.handleLoginClick}/>;
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
