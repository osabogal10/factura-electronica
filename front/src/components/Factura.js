import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './../registerServiceWorker';
import {Container, Row, Col} from 'reactstrap';
import jsPDF from 'jspdf';

export default class Factura extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idFact: props.idFact,
      userToken: localStorage.getItem('token'),
      userId: localStorage.getItem('idUsuario'),
      infoFactura: {},
      ordenes:[]
    };

    this.crearPdf = this.crearPdf.bind(this);
  }

  componentDidMount() {
    fetch('/usuarios/' + this.state.userId + '/facturas/' + this.state.idFact , {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.state.userToken
      }
    }).then((response) => {
      return response.json();
    })
      .then((json) => {
        console.log(json);
        this.setState({infoFactura: json});
        let ordenesCompradas = [];
        for (let i = 0; i<json.ordenes.length; i++)
        {
          ordenesCompradas[i] = {
            nombre: json.ordenes[i].producto.nombre,
            precio: json.ordenes[i].producto.precio,
            cantidad: json.ordenes[i].cantidad
          };
        }
        this.setState({ordenes: ordenesCompradas});
      })
      .catch((error) => console.log(error));
  }

  crearPdf(e){
    e.preventDefault();
    var doc = new jsPDF({
      // orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });
    doc.text('Factura de compra',70,20);
    doc.text(`Fecha: ${this.state.infoFactura.fecha}`,20,30);
    doc.text(`Nombre del cliente: ${this.state.infoFactura.nombreCliente}`,20,40);
    doc.text(`Cedula: ${this.state.infoFactura.cedulaCliente}`,20,50);
    doc.text('Productos adquiridos:',20,60);
    doc.text('Nombre Producto',20,70);
    doc.text('Cantidad',80,70);
    doc.text('Precio',145,70);
    let y = 80;
    for (let i=0; i<this.state.ordenes.length; i++){
      doc.text(`${this.state.ordenes[i].nombre}`,20,y);
      doc.text(`${this.state.ordenes[i].cantidad}`,80,y);
      doc.text(`${this.state.ordenes[i].precio}`,145,y);
      y = y+10;
    }
    doc.text(`Total: ${this.state.infoFactura.total}`,20,y);
    doc.save('Factura.pdf');
  }

  renderProd() {
    return this.state.ordenes.map((prod) =>
      <Col md='6'>
        <div>
          <h5 className='col'>Nombre: {prod.nombre}</h5>
        </div>
        <div>
          <h5 className='col'>Precio: {prod.precio}</h5>
        </div>
        <div>
          <h5 className='col'>Precio: {prod.cantidad}</h5>
        </div>
      </Col>
    );
  }

  render() {
    return (
      <div id={'fondo_facturas'} className='container-fluid'>
        <Container className={'separador'}>
          <div id={'jumbotron_detalle'} className={'jumbotron'}>
            <h1 id={'titulo_form'}>
              Detalle Factura
            </h1>
            <br/>
            <div className='create-form col-md-7 centrarContenido'>
              <div className='main-div'>
                <div className='form-group'>
                  <h5 className='labelInput'>Nombre del cliente:</h5>
                  <h5 className='labelInput'>{this.state.infoFactura.nombreCliente}</h5>
                </div>
                <div className='form-group'>
                  <h5 className='labelInput'>Cedula del cliente:</h5>
                  <h5 className='labelInput'>{this.state.infoFactura.cedulaCliente}</h5>
                </div>
                <div className='form-group'>
                  <h5 className='labelInput'>Fecha de la compra:</h5>
                  <h5 className='labelInput'>{this.state.infoFactura.fecha}</h5>
                </div>
                <h5 className='labelInput'>Productos comprados: </h5>
                <Row>
                  {this.renderProd()}
                </Row>
                <h5 className='labelInput'>Total: {this.state.infoFactura.total}</h5>
                <button type='submit' id={'boton_agregar_productos'} className='btn btn-primary btn-lg btn-block' onClick={this.crearPdf.bind(this)}>
                    Descargar Factura
                </button>
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