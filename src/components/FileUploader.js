/**
 * Created by cbuonocore on 3/16/18.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import {FilePond, File} from 'react-filepond';
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

        this.handleClose = this.handleClose.bind(this);
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
        console.log(fieldName, currentFile, metadata, load, error, progress, abort);
        this.setState({showModal: true, fieldName: fieldName, currentFile: file, metadata: metadata});
        // Send the file binary.
    },

    render() {
        const self = this;

        return (
            <div>
                <h1>Upload your File</h1>


                <FilePond allowMultiple={true}
                          maxFiles={3}
                          ref={ref => this.pond = ref}
                          server={{ process: this.handleProcessing.bind(this) }}
                          oninit={() => this.handleInit()}>

                    {/*// Set current files using the <File/> component*/}
                    {this.state.files.map(file => (
                        <File key={file} source={file} />
                    ))}

                </FilePond>


                <Modal show={self.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Your File</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Enter your Credentials</h4>
                        <p>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Upload</Button>
                    </Modal.Footer>
                </Modal>


            </div>
        );
    }
});

export default FileUploader;

