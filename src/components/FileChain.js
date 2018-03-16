/**
 * Created by cbuonocore on 3/16/18.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import {ListGroup, ListGroupItem, Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';

const FileChain = createReactClass({


    componentWillMount() {
        this.setState({
            showModal: false,
            currentMetadata: null
        });

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
                            return <div className="file-block">
                                {JSON.stringify(file)}
                            </div>
                        })}

                    </ListGroupItem>

                </ListGroup>

                {/*Selected File info modal*/}
                <Modal show={self.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Hey, we Got Your File!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {metadata && <p>{JSON.stringify(metadata)}</p>}
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

export default FileChain;

