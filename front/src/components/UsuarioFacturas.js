import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/Usuario.css';
import {Container, Row, Col} from 'reactstrap';
import registerServiceWorker from './../registerServiceWorker';

/**
 * This class contains all needed to display the nav bar on top.
 */
export default class UsuarioFacturas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: localStorage.getItem('token'),
      userId: localStorage.getItem('idUsuario'),
      facturas: [],
      onChange: this.props.onNewFactura
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id) {
    console.log(id);
    let callback = this.props.onReceiptClick;
    callback(id);
  }

  componentDidMount() {
    fetch('/usuarios/' + this.state.userId + '/facturas', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.state.userToken
      }
    }).then((response) => {
      return response.json();
    })
      .then((json) => {
        console.log(json);
        this.setState({facturas: json});
      })
      .catch((error) => console.log(error));
  }

  renderFacturas() {
    return this.state.facturas.map((fact, i) =>
      <Col key={'card' + i} md='4'>
        <div onClick={this.handleSubmit.bind(this,fact._id)}>
          <div key={'card' + i} className='card card_factura'>
            <img key={'img' + i} src={require('./../img/una_factura.png')} alt='' className='card-img-top'/>
            <div key={'card_body' + i} className='card-body'>
              <div key={'nombre' + i} className='place_item_name'>Cliente: {fact.nombreCliente}</div>
              <div key={'cedula' + i} className='place_item_location'>Fecha: {fact.fecha}</div>
              <div key={'precio' + i} className='place_item_location'>Total: ${fact.total}</div>
            </div>
          </div>
        </div>
      </Col>
    );
  }

  render() {
    return (
      <div>
        <div id={'fondo_facturas'} className={'container-fluid'}>
          <Container className={'contenedor_titulo'}>
            <div className="card mb-3">
              <img className="card-img-top" src={require('./../img/facturas.png')} alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">Visualiza aquí todas tus facturas</h5>
                <p className="card-text">Tienes un total de {this.state.facturas.length} Facturas.
                  <br/>
                  También puedes agregar nuevas facturas presionando el siguiente botón.</p>
                <button type="button" className="btn btn-success" onClick={this.state.onChange.bind(this)}>Agregar</button>
              </div>
            </div>
          </Container>
          <Container>
            <Row>
              {console.log(this.state.facturas)}
              {this.renderFacturas()}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

registerServiceWorker();