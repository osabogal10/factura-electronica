import React, {Component} from 'react';
import './style/App.css';
import './style/Navbar.css';
import NavBar from './components/Navbar';
import NavBarUsuario from './components/NavbarUsuario';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Signup from './components/Signup';
import Usuario from './components/Usuario';
import NewProducto from './components/NewProducto';
import NewFactura from './components/NewFactura';
import UsuarioFacturas from './components/UsuarioFacturas';
import UsuarioProductos from './components/UsuarioProductos';


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
    this.handleNewProduct = this.handleNewProduct.bind(this);
    this.handleCreateProductClick = this.handleCreateProductClick.bind(this);
    this.handleNewFactura = this.handleNewFactura.bind(this);
    this.handleCreateFacturaClick = this.handleCreateFacturaClick.bind(this);
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
    this.setState({location: 'UsuarioFacturas', navbar: 'UsuarioFacturas'});
  }

  handleReceiptClick(idFact){
    this.setState({location: 'Factura', factura: idFact});
  }

  handleProductClick(idProduct){
    this.setState({location: 'Factura', producto: idProduct});
  }

  handleProductClick(idProduct){
    this.setState({location: 'Producto', producto: idProduct});
  }

  handleNewProduct(){
    this.setState({location: 'NuevoProducto', navbar: 'Usuario'});
  }

  handleCreateProductClick(){
    this.setState({location: 'UsuarioProductos', navbar: 'Usuario'});
  }

  handleNewFactura(){
    this.setState({location: 'NuevaFactura', navbar: 'Usuario'});
  }

  handleCreateFacturaClick(){
    this.setState({location: 'UsuarioFacturas', navbar: 'Usuario'});
  }


  render() {

    let navbar;
    if(this.state.navbar === 'Inicio') {
      navbar = <NavBar onChange={this.callbackNavbar}/>;
    } else if (this.state.navbar === 'UsuarioFacturas'){
      navbar = <NavBarUsuario onChange={this.callbackNavbar} onLogOut={this.callbackInicioNavbar}/>;
    }


    let inicio;
    if(this.state.location === 'Home') {
      inicio = <Inicio/>;
    } else if(this.state.location === 'Login'){
      inicio = <Login onLogin = {this.handleLogin}/>;
    } else if(this.state.location === 'Signup'){
      inicio = <Signup onSubmitClick = {this.handleLoginClick}/>;
    } else if(this.state.location === 'UsuarioFacturas'){
      inicio = <UsuarioFacturas onReceiptClick = {this.handleReceiptClick}/>;
    } else if(this.state.location === 'Factura'){
      inicio = <Usuario onReceiptClick = {this.handleReceiptClick}/>;
    } else if(this.state.location === 'NuevoProducto') {
      inicio = <NewProducto onNewProduct = {this.handleCreateProductClick}/>;
    } else if(this.state.location === 'NuevaFactura') {
      inicio = <NewFactura onNewFactura = {this.handleCreateFacturaClick}/>;
    } else if(this.state.location === 'UsuarioProductos') {
      inicio = <UsuarioProductos onProductClick={this.handleReceiptClick}/>;
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
