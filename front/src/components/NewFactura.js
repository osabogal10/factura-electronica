import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/App.css';
import '../style/NewFactura.css';
import {Container, Row, Col} from 'reactstrap';
import registerServiceWorker from './../registerServiceWorker';

export default class NewFactura extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreCliente: '',
      cedulaCliente: '',
      fecha: '',
      ordenes: [],
      productos: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClientNameChange = this.handleClientNameChange.bind(this);
    this.handleCedulaClienteChange = this.handleCedulaClienteChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  handleClientNameChange(event) {
    this.setState({nombreCliente: event.target.value});
  }

  handleCedulaClienteChange(event) {
    this.setState({cedulaCliente: event.target.value});
  }

  handleDateChange(event) {
    this.setState({fecha: event.target.value});
  }

  handleQuantityChange(event) {
    console.log(event.target.name);
    let idProd = event.target.name;
    console.log(event.target.value);

    this.auxEliminarOrden(idProd);
    let nuevaOrden = {
      producto: idProd,
      cantidad: event.target.value
    };

    console.log('Esta es la ordeeeeeeen');
    console.log(nuevaOrden);
    this.state.ordenes.push(nuevaOrden);
  }

  componentDidMount() {

    let idUsuario = localStorage.getItem('idUsuario');
    let token = localStorage.getItem('token');
    fetch('/usuarios/' + idUsuario + '/productos', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => {
      return response.json();
    })
      .then((json) => {
        console.log(json);
        this.setState({productos: json});
      })
      .catch((error) => console.log(error));
  }

  handleSubmit(e) {
    e.preventDefault(); //Que jeso???
    let callback = this.props.onNewFactura;
    let idUsuario = localStorage.getItem('idUsuario');
    let token = localStorage.getItem('token');
    let bodyParams = {
      nombreCliente: this.state.nombreCliente,
      cedulaCliente: this.state.cedulaCliente,
      fecha: this.state.fecha,
      ordenes: this.state.ordenes
    };

    let body = JSON.stringify(bodyParams);
    console.log(body);
    fetch('usuarios/' + idUsuario + '/facturas', {
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

  auxEliminarOrden(id) {
    let ordenesMod = this.state.ordenes;
    for (let i = 0; i < ordenesMod.length; i++) {
      if (ordenesMod[i].producto === id) {
        ordenesMod.splice(i, 1);
        break;
      }
    }


    this.state.ordenes = ordenesMod;
  }


  renderProductosDropdown() {

    return this.state.productos.map((prod, i) =>
      <Col key={'card' + i} md='6'>
        <div key={'form-group' + i} className='form-group row'>
          <label key={'labelInput' + i} className='col-form-label'>{prod.nombre}</label>
          <div className={'col centrarContenido'}>
            <input key={'inputProd' + i} type='number' className='form-control inputNumber' name={prod._id}
              placeholder='0' onChange={this.handleQuantityChange}/>
          </div>
        </div>
      </Col>
    );


  }

  render() {
    return (
      <div id={'fondo_facturas'} className='container-fluid'>
        <Container className={'separador'}>
          <div id={'jumbotron_estilo'} className={'jumbotron'}>
            <h1 id={'titulo_form'}>
              Agrega una nueva factura
            </h1>
            <br/>
            <div className='create-form col-md-7 centrarContenido'>
              <div className='main-div'>
                <form id='Signup' onSubmit={this.handleSubmit}>
                  <div className='form-group'>
                    <p className='labelInput'>Ingresa el nombre del cliente:</p>
                    <input type='text' className='form-control' id='inputNombre' placeholder='Nombre'
                      onChange={this.handleClientNameChange}/>
                  </div>
                  <div className='form-group'>
                    <p className='labelInput'>Ingresa la cédula del cliente:</p>
                    <input type='number' className='form-control' id='inputDescripcion' placeholder='Cédula' min='1'
                      onChange={this.handleCedulaClienteChange}/>
                  </div>
                  <div className='form-group'>
                    <p className='labelInput'>Ingresa la fecha de la compra:</p>
                    <input type='text' className='form-control' id='inputPrecio' placeholder='Fecha'
                      onChange={this.handleDateChange}/>
                  </div>
                  <br/>
                  <p className='labelInput'>Elige la cantidad de los productos: </p>
                  <Row className={'agregar_productos'}>
                    {this.renderProductosDropdown()}
                  </Row>
                  <button type='submit' id={'boton_agregar_productos'} className='btn btn-primary btn-lg btn-block'>
                    Crear
                  </button>
                </form>
              </div>
            </div>


            <br/>
          </div>
        </Container>
      </div>

    );
  }
}


registerServiceWorker();