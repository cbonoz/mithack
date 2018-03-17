/**
 * Created by cbuonocore on 3/16/18.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import {FilePond, File} from 'react-filepond';
import {Button, Modal, ListGroup, ListGroupItem} from 'react-bootstrap';
import api from '../helpers/api';
import PropTypes from 'prop-types';

const FileUploader = createReactClass({

    componentWillMount() {
        this.setState({
            files: [],
            showModal: false,
            // current file properties for upload.
            currentFile: null,
            metadata: null,
            fieldName: null
        });

        // this.handleClose = this.handleClose.bind(this);
        // this.handleProcessing = this.handleProcessing.bind(this)
    },

    handleClose() {
        // TODO: Upload the current file with the current modal-set credentials.
        this.setState({showModal: false});

    },

    // Initialized the file
    handleInit() {
        console.log('filepond now initialised', this.pond);
    },

    // handle file upload.
    handleProcessing(fieldName, currentFile, metadata, load, error, progress, abort) {
        // console.log(JSON.stringify(load));
        this.setState({showModal: true, fieldName: fieldName, currentFile: currentFile, metadata: metadata});
        // Send the file binary.
    },

    render() {
        const self = this;


        return (
            <div className="file-uploader">
                <ListGroup>
                    <ListGroupItem bsStyle="info">Upload your File</ListGroupItem>
                    <ListGroupItem>

                        <FilePond allowMultiple={true}
                                  maxFiles={3}
                                  ref={ref => this.pond = ref}
                                  server={{process: this.handleProcessing}}
                                  oninit={() => this.handleInit()}>

                            {/*// Set current files using the <File/> component*/}
                            {this.state.files.map(file => (
                                <File key={file} source={file}/>
                            ))}

                        </FilePond>
                    </ListGroupItem>
                </ListGroup>

                {/*Upload file modal*/}
                <Modal show={self.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Hey, We Got Your File!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        {self.state.metadata && <p>Are you ready to submit file: <b>{self.state.metadata['name']}</b>?</p>}
                        <hr/>

                        <h4>Sign with your Private Key below</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.handleClose}>Upload</Button>
                    </Modal.Footer>
                </Modal>


            </div>
        );
    }
});

export default FileUploader;

