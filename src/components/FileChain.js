/**
 * Created by cbuonocore on 3/16/18.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import {Button, ListGroup, ListGroupItem, Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';

const FileChain = createReactClass({


    componentWillMount() {
        this.setState({
            showModal: false,
            currentMetadata: null
        });

        this.selectFile = this.selectFile.bind(this);
    },

    selectFile(metadata) {
        console.log('selectFile', JSON.stringify(metadata));
        this.setState({metadata: metadata, showModal: true});
    },

    handleClose() {
        this.setState({showModal: false});
    },

    render() {
        const self = this;
        const metadata = self.state.currentMetadata;

        return (
            <div className="file-chain">
                <ListGroup>
                    <ListGroupItem bsStyle="success">Public File Chain</ListGroupItem>
                    <ListGroupItem>

                        {self.props.blockFiles.map((file) => {
                            return <div className="file-block" onClick={() => self.selectFile(file)}>
                                {Object.keys(file).map((key) => {
                                    return <li><b>{key}:</b>{file[key]}</li>
                                })}
                            </div>
                        })}

                    </ListGroupItem>

                </ListGroup>

                {/*Selected File metadata info modal*/}
                <Modal show={self.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>File</Modal.Title>
                    </Modal.Header>
                    < Modal.Body >
                        < p > {metadata && JSON.stringify(metadata)}</p>
                        <hr/>

                        <h4>Sign with your Private Key below</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
});

export default FileChain;

