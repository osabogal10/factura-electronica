import React, {Component} from 'react';
import './style/App.css';
import NavBar from './Navbar';
import Base64 from "base-64";
import Utf8 from "utf8";


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            navbar: 'index',
            facturas: [],
            productos: [],
            idUser: null,
            userName: null,
            userMail: null
        };

        this.callbackNavbar = this.callbackNavbar.bind(this);
    }
    callbackNavbar(value) {
        this.setState({location: value});
    }

    componentDidMount() {
        fetch("/facturas").then((response) => {
            return response.json();
        })
            .then((json) => this.setState({facturas: json}))
            .catch((error) => console.log(error));
        fetch("/productos").then((response) => {
            return response.json();
        })
            .then((json) => this.setState({productos: json}))
            .catch((error) => console.log(error));
    }

    onSubmitLogin(email, password) {
        let value = email + ";;;" + password;
        let bytes = Utf8.encode(value);
        let encoded = Base64.encode(bytes);
        fetch("/login/" + encoded)
            .then(res => {
                return (res.json());
            })
            .then(user => {
                this.setState( () => {
                        return {
                            idUser: user.id,
                            userName: user.name,
                            userMail: user.email,
                            navbar: 'user',
                        };
                    }
                );
            })
            .catch((err) => console.log(err));
    }

    onSubmitSignin(name, email, password) {
        let value = name + ";;;" + email + ";;;" + password;
        let bytes = Utf8.encode(value);
        let encoded = Base64.encode(bytes);
        fetch("/signin/" + encoded)
            .then((res) => {
                return (res.json());
            })
            .then((user) => {
                this.setState(() => {
                        return {
                            idUser: user.id,
                            userName: user.name,
                            userMail: user.email,
                            navbar: 'user',
                        };
                    }
                );
            })
            .catch((err) => console.log(err));
    }

    onLogout(){
        this.setState(() => {
                return {
                    idUser: null,
                    userName: null,
                    userMail: null,
                    navbar: 'index',
                };
            }
        );
    }

    renderFactura() {
        return this.state.facturas.map((fact) =>
            <div key={fact._id}>Factura con nombre {fact.nombreCliente}</div>)
    }

    render() {

        let navbar = null;
        navbar= <NavBar onChange={this.callbackNavbar}/>;

        return (
            <div className="App">
                <div>
                    {navbar}
                </div>
                <div className={"jumbotron"}>
                    {this.renderFactura()}
                </div>
            </div>
        );
    }
}

export default App;
