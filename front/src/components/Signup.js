import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../style/App.css"
import registerServiceWorker from "./../registerServiceWorker";

export default class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className={"jumbotron"}>
          <h1 id={"titulo_grande"}>
            Regístrate
          </h1>
          <h3>
            Cambio de estadoooo
          </h3>
          <br/>
        </div>
      </div>
      
    );
  }
}


registerServiceWorker();