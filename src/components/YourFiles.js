/**
 * Created by cbuonocore on 3/16/18.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";

const YourFiles = createReactClass({

    componentWillMount() {
        this.setState({
            address: "",
        });
    },

    search() {
        const address = this.state.address;
        console.log('searching files with address', address);
    },

    handleChange(e) {
        this.setState({ address: e.target.value });
    },

    getValidationState() {
        const length = this.state.address.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    },

    render() {
        return (
            <div className="centered files-page">

                <h1>Your Files</h1>
                <p>Enter arbitrary address below to fetch Encoded files for that address</p>

                <p>Once these files are shown below, unlock them using your original key,
                    or a proxy key provisioned by the original file owner</p>

                <FormGroup
                    validationState={this.getValidationState()}
                    controlId="formBasicText">
                    <ControlLabel>Enter your address</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.address}
                        placeholder="Enter Public Address"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />

                    <Button bsStyle="success" className="search-button" onClick={() => this.search()}>Search</Button>
                </FormGroup>

            </div>
        );
    }
});

export default YourFiles;

