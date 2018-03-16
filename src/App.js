import React, {Component} from 'react';
import logo from './logo.svg';
import Home from './components/Home';
import Footer from './components/Footer';
import {Navbar, NavItem, NavDropdown, Nav, MenuItem} from 'react-bootstrap';
import './App.css';

// import rekeyedLogo from './assets/rekeyed_invert.png';
import rekeyedLogo from './assets/rekeyed_cropped.png';

class App extends Component {

    render() {
        const self = this;

        return (
            <div className="App">

                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {/*<a href="#brand">Rekeyed</a>*/}
                            <img src={rekeyedLogo} className="header-bar-logo"/>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">
                                Create an Account
                            </NavItem>
                            <NavItem eventKey={2} href="#">
                                Upload a File
                            </NavItem>
                            <NavItem eventKey={3} href="#">
                                About Us
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Home/>

                <Footer/>
            </div>
        );
    }
}

export default App;
