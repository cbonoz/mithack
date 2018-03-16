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


    },

    // Initialized the file
    handleInit() {
        console.log('filepond now initialised', this.pond);
    },

    // handle file upload.
    handleProcessing(fieldName, currentFile, metadata, load, error, progress, abort) {
        console.log(fieldName, currentFile);//, metadata, load, error, progress, abort);
        console.log(JSON.stringify(metadata));
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
                                  server={{process: this.handleProcessing.bind(this)}}
                                  oninit={() => this.handleInit()}>

                            {/*// Set current files using the <File/> component*/}
                            {this.state.files.map(file => (
                                <File key={file} source={file}/>
                            ))}

                        </FilePond>
                    </ListGroupItem>
                </ListGroup>


                <Modal show={self.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Hey, we Got Your File!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {self.state.metadata && <p>Are you ready to submit: {self.state.metadata['name']}?</p>}
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

