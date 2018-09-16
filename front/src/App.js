import React, {Component} from 'react';
import './style/App.css';
import './style/Navbar.css';
import NavBar from './components/Navbar';
import NavBarUsuario from './components/NavbarUsuario';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Signup from './components/Signup';
import Usuario from './components/Usuario'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      navbar: 'Inicio',
      location: 'Home',
      factura: null,
      producto: null
    };

    //Funciones
    this.callbackNavbar = this.callbackNavbar.bind(this);
    this.callbackInicioNavbar = this.callbackInicioNavbar.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleReceiptClick = this.callbackInicioNavbar.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
  }

  callbackNavbar(value) {
    this.setState({location: value});
  }

  callbackInicioNavbar(){
    localStorage.clear();
    this.setState({location:'Home', navbar:'Inicio'});
  }

  handleLoginClick(){
    this.setState({location: 'Login'});
  }

  handleLogin(){
    this.setState({location: 'Usuario', navbar: 'Usuario'});
  }

  handleReceiptClick(idFact){
    this.setState({location: 'Factura', factura: idFact});
  }

  handleProductClick(idProduct){
    this.setState({location: 'Producto', producto: idProduct});
  }


  render() {

    let navbar;
    if(this.state.navbar === 'Inicio') {
      navbar = <NavBar onChange={this.callbackNavbar}/>;
    } else if (this.state.navbar === 'Usuario'){
      navbar = <NavBarUsuario onChange={this.callbackNavbar} onLogOut={this.callbackInicioNavbar}/>;
    }


    let inicio;
    if(this.state.location === 'Home') {
      inicio = <Inicio/>;
    } else if(this.state.location === 'Login'){
      inicio = <Login onLogin = {this.handleLogin}/>;
    } else if(this.state.location === 'Signup'){
      inicio = <Signup onSubmitClick = {this.handleLoginClick}/>;
    } else if(this.state.location === 'Usuario'){
      inicio = <Usuario onReceiptClick = {this.handleReceiptClick} onProductClick = {this.handleProductClick}/>;
    } else if(this.state.location === 'Factura'){
      inicio = <Usuario onReceiptClick = {this.handleReceiptClick}/>;
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