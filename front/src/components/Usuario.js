import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/Navbar.css';
import registerServiceWorker from './../registerServiceWorker';

/**
 * This class contains all needed to display the nav bar on top.
 */
export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onChange: props.onChange
    };
  }
  render() {
    return (
      <div>

      </div>
    );
  }
}

registerServiceWorker();