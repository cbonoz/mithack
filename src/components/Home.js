/**
 * Created by cbuonocore on 3/16/18.
 */

import React from 'react';

import FileChain from './FileChain';
import FileUploader from './FileUploader';
import createReactClass from 'create-react-class';
import {Jumbotron, Button, Grid, Row, Col} from 'react-bootstrap';

import rekeyedLogo from '../assets/rekeyed_invert.png';


import api from '../helpers/api';
import PropTypes from 'prop-types';

const Home = createReactClass({

    componentWillMount() {
        console.log(api.BASE_URL);
        this.setState({
            files: []
        });
    },

    render() {
        const self = this;
        return (
            <div className="home-page">

                {/*<h1>Rekeyed</h1>*/}
                <p>
                    Document sharing and permission control for everyone.
                </p>
                <p>
                    No Username and password required.
                </p>
                <p><Button bsStyle="primary">Get Started</Button></p>

                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={6}>
                            {/*<FileUploader/>*/}
                        </Col>
                        <Col xs={12} md={6}>
                            {/*<FileChain/>*/}
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
});

export default Home;

