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

const MAX_BLOCKS = 15;

const Home = createReactClass({

    componentWillMount() {
        console.log(api.BASE_URL);
        this.setState({
            files: [],
            blockFiles: []
        });

        this.getAccount = this.getAccount.bind(null, this);

        // this.getBlockFiles();
        this.demoBlocks();
    },

    getAccount() {
        console.log('getAccount');
    },

    // Demo file block generation.
    demoBlocks() {
        const self = this;

        function myFunction() {
            self.generateNextBlock();
            const rand = Math.round(Math.random() * 2000) + 1000; // 1000-3000ms interval.
            setTimeout(myFunction, rand);
        }

        setTimeout(myFunction, 1000);
    },

    generateNextBlock() {
        const self = this;
        const block = api.createTestMetaData();
        let nextList = [block].concat(self.state.blockFiles);

        if (nextList.length > MAX_BLOCKS) {
            nextList = nextList.splice(0, MAX_BLOCKS);
        }

        console.log(nextList);
        this.setState({blockFiles: nextList})
    },

    getBlockFiles() {

    },

    render() {
        const self = this;
        return (
            <div className="home-page">
                {/*TODO: uncomment*/}
                <img src={rekeyedLogo} className="centered header-logo"/>

                <p className="header-text-h2">
                    Document sharing and permission control for <b>Everyone.</b>
                </p>
                <p className="header-text-h3">
                    <b>No</b> Username or Password required.
                </p>
                <p>
                    <Button bsStyle="primary" className="create-button" onClick={() => self.getAccount()}>Create Account</Button>
                </p>

                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={5}>
                            <FileUploader/>
                        </Col>

                        <Col xs={12} md={7}>
                            <FileChain blockFiles={self.state.blockFiles}/>
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
});

export default Home;

