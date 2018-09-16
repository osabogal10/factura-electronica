import React, {Component} from 'react';
import './style/App.css';
import './style/Navbar.css';
import NavBar from './components/Navbar';
import Inicio from './components/Inicio'

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            navbar: 'index',
            facturas: [],
            productos: [],
            idUser: null,
        };

        this.callbackNavbar = this.callbackNavbar.bind(this);
    }

    callbackNavbar(value) {
        this.setState({location: value});
    }


    render() {

        let navbar = <NavBar onChange={this.callbackNavbar}/>;
        let inicio = <Inicio/>
        return (
            <div className="App">
                <div>
                    {navbar}
                </div>
                <div className="container-fluid">
                    {inicio}
                </div>
            </div>
        );
    }
}

export default App;
