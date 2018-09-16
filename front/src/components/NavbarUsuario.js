import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../style/Navbar.css";
import registerServiceWorker from "./../registerServiceWorker";

/**
* This class contains all needed to display the nav bar on top.
*/
export default class NavbarUsuario extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      onChange: props.onChange
    };
  }
  
  render() {
    return (
      <div className="fixed-top">
        <nav id="navbar_home" className="nav navbar-light">
          <a id="nombre_nav" className="col-md-7 navbar-brand hvr-underline-from-center" 
            onClick={this.state.onChange.bind(this, 'Home')}>
            <img src={require("./../img/newsletter.png")} width="30" height="30"
              className="d-inline-block align-top" alt=""/> Factura Electronica
          </a>
          <a className="nav-item nav-link "  onClick={this.state.onChange.bind(this, 'Facturas')}>Facturas</a>
          <a className="nav-item nav-link "  onClick={this.state.onChange.bind(this, 'Productos')}>Productos</a>
          <a className="nav-item nav-link "  onClick={this.state.onChange.bind(this, 'Signout')}>Log Out</a>
        </nav>
      
      </div>
    );
  }
}
  
  
registerServiceWorker();