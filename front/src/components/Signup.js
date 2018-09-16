import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../style/App.css';
import '../style/Signup.css';
import registerServiceWorker from "./../registerServiceWorker";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: '',
      email: '',
      password: ''

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    

  }

  handleNameChange(event) {
    this.setState({nombre: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    let callback = this.props.onSubmitClick;
    let body = JSON.stringify(this.state);
    console.log(body);
    fetch('usuarios/signup', {
      method: 'POST',
      body: body,
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      console.log(response);
      if(response.status === 201) {
        alert('Usuario creado exitosamente!');
        callback();
      }
      else {
        alert('Correo electrónico ya existe');
      }
    });
    
  }



  render() {
    return (
      <div className="container-fluid">
        <div className={"jumbotron"}>
          <h1 id={"titulo_grande"}>
            Regístrate
          </h1>
          <br/>
          <div className="signup-form col-md-6 centrarContenido">
            <div className="main-div">
              <form id="Signup" onSubmit ={this.handleSubmit}>
                <div className="form-group">
                  <p className="labelInput">Ingresa tu Nombre:</p>
                  <input type="text" className="form-control" id="inputName" placeholder="Nombre" onChange={this.handleNameChange}/>
                </div>
                <div className="form-group">
                  <p className="labelInput">Ingresa tu Correo:</p>
                  <input type="email" className="form-control" id="inputEmail" placeholder="Correo Electrónico" onChange={this.handleEmailChange}/>
                </div>
                <div className="form-group">
                  <p className="labelInput">Ingresa tu Contraseña</p>
                  <input type="password" className="form-control" id="inputPassword" placeholder="Contraseña" onChange={this.handlePasswordChange}/>
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </form>
            </div>
          </div>


          <br/>
        </div>
      </div>
      
    );
  }
}


registerServiceWorker();