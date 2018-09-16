import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/Usuario.css';
import {Container, Row, Col} from 'reactstrap';
import registerServiceWorker from './../registerServiceWorker';

/**
 * This class contains all needed to display the nav bar on top.
 */
export default class Usuario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: localStorage.getItem('token'),
      userId: localStorage.getItem('idUsuario'),
      facturas: [],
      productos: []
    };
  }

  handleReceipt(idFact) {
    let callback = this.props.onReceiptClick;
  }

  handleProduct(idProduct) {
    let callback = this.props.onProductClick;
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


    fetch('/usuarios/' + this.state.userId + '/productos', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.state.userToken
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

  renderFacturas() {
    return this.state.facturas.map((fact, i) =>
      <Col key={'card' + i} md='4'>
        <div key={'card' + i} className='card'>
          <a href={'#'}>
            <img key={'img' + i} src={require('./../img/una_factura.png')} alt='Factura' className='card-img-top'/>
            <div key={'card_body' + i} className='card-body'>
              <div key={'nombre' + i} className='place_item_name'>{fact.nombreCliente}</div>
              <div key={'cedula' + i} className='place_item_location'>{fact.cedulaCliente}</div>
            </div>
          </a>
        </div>
      </Col>
    );
  }

  render() {
    return (
      <div>
        <div id={'fondo_facturas'} className={'container-fluid'}>
          <Container>

          </Container>
          <Container>
            <Row>
              {this.renderFacturas()}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

registerServiceWorker();