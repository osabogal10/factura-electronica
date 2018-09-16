import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/Usuario.css';
import {Container, Row, Col} from 'reactstrap';
import registerServiceWorker from './../registerServiceWorker';

/**
 * This class contains all needed to display the nav bar on top.
 */
export default class UsuarioProductos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: localStorage.getItem('token'),
      userId: localStorage.getItem('idUsuario'),
      productos: []
    };
  }

  handleProductClick(idProduct) {
    let callback = this.props.onProductClick;
  }

  componentDidMount() {
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

  renderProductos() {
    return this.state.productos.map((product, i) =>
      <Col key={'card' + i} md='6'>
        <div key={'card' + i} className='card'>
          <div key={'card_header' + i} className='card-header text-center'>
            {product.nombre}
          </div>
          <div key={'card_body' + i} className='card-body'>
            <div key={'descripcion' + i} className=''>Descripción: {product.descripcion}</div>
            <div key={'precio' + i} className=''>Precio: ${product.precio}</div>
          </div>
          <div className="card-footer">
            <Row>
              <button type="button" className="btn btn-info">Editar</button>
              <button type="button" className="btn btn-danger">Borrar</button>
            </Row>
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
              <img className="card-img-top" src={require('./../img/productos.png')} alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">Visualiza aquí todos tus productos</h5>
                <p className="card-text">Tienes un total de {this.state.productos.length} productos.
                  <br/>
                  También puedes agregar nuevos productos presionando el siguiente botón.</p>
                <button type="button" className="btn btn-success">Agregar</button>
              </div>
            </div>
          </Container>
          <Container>
            <Row>
              {this.renderProductos()}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

registerServiceWorker();