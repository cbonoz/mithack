import React, {Component} from 'react';
import logo from './logo.svg';
import Home from './components/Home';
import About from './components/About';
import YourFiles from './components/YourFiles';
import Footer from './components/Footer';
import {Navbar, NavItem, NavDropdown, Nav, MenuItem} from 'react-bootstrap';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


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
                            <NavItem eventKey={1} href="/">
                                Create an Account
                            </NavItem>
                            <NavItem eventKey={2} href="/files">
                                Your Files
                            </NavItem>
                            <NavItem eventKey={3} href="/about">
                                About Us
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Router>
                    <div>
                        <Route exact path="/" component={Home}/>
                        <Route path="/files" component={YourFiles}/>
                        <Route path="/about" component={About}/>
                    </div>
                </Router>

                <Footer/>
            </div>
        );
    }
}

export default App;
