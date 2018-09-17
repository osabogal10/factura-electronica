import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/App.css';
import registerServiceWorker from './../registerServiceWorker';

export default class Factura extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idFact: props.idFact
    };
  }

  render() {
    return (
      <div className="container-fluid">
        Hola
      </div>
    );
  }
}


registerServiceWorker();