import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../style/App.css";
import '../style/Login.css';
import registerServiceWorker from "./../registerServiceWorker";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    let callback = this.props.onLogin;
    let body = JSON.stringify(this.state);
    console.log(body);
    fetch('usuarios/login', {
      method: 'POST',
      body: body,
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      console.log(response);
      response.json().then(json => {
        console.log(json);
        if(json.message === 'Autenticación Exitosa'){
          let myToken = json.token;
          let idUsuario = json.idUsuario;

          localStorage.setItem('token', myToken);
          localStorage.setItem('idUsuario', idUsuario);
          callback();
          alert(json.message);
        } else {
          alert(json.message);
        }


      });

    });
    
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className={'jumbotron'}>
          <h1 id={'titulo_grande'}>
            Inicia Sesión
          </h1>
          <br/>
          <div className="login-form col-md-6 centrarContenido">
            <div className="main-div">
              <form id="Signup" onSubmit ={this.handleSubmit}>
                <div className="form-group">
                  <p className="labelInput">Ingresa tu Correo:</p>
                  <input type="email" className="form-control" id="inputEmail" placeholder="Correo Electrónico" onChange={this.handleEmailChange}/>
                </div>
                <div className="form-group">
                  <p className="labelInput">Ingresa tu Contraseña</p>
                  <input type="password" className="form-control" id="inputPassword" placeholder="Contraseña" onChange={this.handlePasswordChange}/>
                </div>
                <button type="submit" className="btn btn-primary">
                  Log In
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