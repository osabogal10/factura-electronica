import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../style/App.css"
import registerServiceWorker from "./../registerServiceWorker";

export default class Inicio extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className={"jumbotron"}>
          <h1 id={"titulo_grande"}>
            Factura electrónica
          </h1>
          <h3>
            Genera tus facturas de una manera rápida y eficiente para cumplir con la normatividad y ahorrar
            en costos.
          </h3>
          <br/>
          <iframe width="350" height="250" src="https://www.youtube.com/embed/PFsiufLVxkk" frameBorder="0"
            allow="autoplay; encrypted-media" allowFullScreen>Aqui puedes conocer más</iframe>
        </div>
      </div>
      
    );
  }
}


registerServiceWorker();