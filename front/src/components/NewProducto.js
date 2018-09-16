import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../style/App.css";
import '../style/NewProducto.css';
import registerServiceWorker from "./../registerServiceWorker";

export default class NewProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      descripcion: '',
      precio: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({nombre: event.target.value});
  }

  handleDescriptionChange(event) {
    this.setState({descripcion: event.target.value});
  }

  handlePriceChange(event) {
    this.setState({precio: event.target.value});
  }



  handleSubmit(e){
    e.preventDefault(); //Que jeso???
    let callback = this.props.onNewProduct;
    let idUsuario = localStorage.getItem('idUsuario');
    let token = localStorage.getItem('token');
    let body = JSON.stringify(this.state);
    console.log(body);
    fetch('usuarios/' + idUsuario + '/productos', {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      console.log(response);
      response.json().then(json => {
        console.log(json);
        callback();
        alert(json.message);

      });

    });
    
  }

  render() {
    return (
      <div id={'fondo_facturas'} className='container-fluid'>
        <div className={'jumbotron'}>
          <h1 id={'titulo_crear'}>
            Agrega un nuevo producto
          </h1>
          <br/>
          <div className="create-form col-md-6 centrarContenido">
            <div className="main-div">
              <form id="Signup" onSubmit ={this.handleSubmit}>
                <div className="form-group">
                  <p className="labelInput">Ingresa el nombre del producto:</p>
                  <input type="text" className="form-control" id="inputNombre" placeholder="Nombre" onChange={this.handleNameChange}/>
                </div>
                <div className="form-group">
                  <p className="labelInput">Ingresa una descripción corta:</p>
                  <input type="text" className="form-control" id="inputDescripcion" placeholder="Descripción" onChange={this.handleDescriptionChange}/>
                </div>
                <div className="form-group">
                  <p className="labelInput">Ingresa el precio:</p>
                  <input type="number" className="form-control" id="inputPrecio" placeholder="Precio" min="0" onChange={this.handlePriceChange}/>
                </div>
                <button type="submit" className="btn btn-primary">
                  Crear
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