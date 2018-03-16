import React, {Component} from 'react';
import logo from './logo.svg';
import Home from './components/Home';
import {Navbar, NavItem, NavDropdown, Nav, MenuItem} from 'react-bootstrap';
import './App.css';

class App extends Component {

    render() {
        const self = this;

        return (
            <div className="App">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#brand">Rekeyed</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">
                                Upload a File
                            </NavItem>
                            <NavItem eventKey={2} href="#">
                                About Us
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Home/>
            </div>
        );
    }
}

export default App;
