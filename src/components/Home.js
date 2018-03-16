/**
 * Created by cbuonocore on 3/16/18.
 */

import React from 'react';

import FileChain from './FileChain';
import FileUploader from './FileUploader';
import createReactClass from 'create-react-class';
import {Jumbotron, Button, Grid, Row, Col} from 'react-bootstrap';


// import rekeyedLogo from '../assets/rekeyed_invert.png';
import rekeyedLogo from '../assets/rekeyed_cropped.png';

import api from '../helpers/api';
import PropTypes from 'prop-types';

const Home = createReactClass({

    componentWillMount() {
        console.log(api.BASE_URL);
        this.setState({
            files: [],
            blockFiles: [],
        });

        this.getAccount = this.getAccount.bind(this);

        this.getBlockFiles();
    },

    getAccount() {
        console.log('getAccount');
    },

    generateNextBlock() {
        const self = this;

        const block = {

        };

        const nextBlocks = self.state.blockFiles;
        nextBlocks.push(block);
        self.setState({blockFiles: nextBlocks});
    },

    getBlockFiles() {

    },

    render() {
        const self = this;
        return (
            <div className="home-page">
                <img src={rekeyedLogo} className="centered header-logo"/>

                <p className="header-text-h2">
                    Document sharing and permission control for everyone.
                </p>
                <p className="header-text-h3">
                    No Username and password required.
                </p>
                <p>
                    <Button bsStyle="primary" onClick={() => self.getAccount()}>Create Account</Button>
                </p>

                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={6}>
                            <FileUploader/>
                        </Col>
                        <Col xs={12} md={6}>
                            <FileChain blockFiles={self.state.blockFiles}/>
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
});

export default Home;

