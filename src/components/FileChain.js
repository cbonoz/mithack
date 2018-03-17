/**
 * Created by cbuonocore on 3/16/18.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import {Button, ControlLabel, HelpBlock, FormControl, FormGroup, ListGroup, ListGroupItem, Modal} from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import Columns from 'react-columns';
import PropTypes from 'prop-types';
import FileDetails from "./FileDetails";

const FileChain = createReactClass({


    componentWillMount() {
        this.setState({
            showModal: false,
            currentMetadata: null,
            currentKey: null,
        });

        // this.selectFile = this.selectFile.bind(this);
    },

    selectFile(metadata) {
        console.log('selectFile', JSON.stringify(metadata));
        this.setState({currentMetadata: metadata, showModal: true});
    },

    download() {
        // TODO: implement
        console.log('download')
    },

    handleKeyChange(e) {
        this.setState({ currentKey: e.target.value });
    },

    handleClose() {
        this.setState({showModal: false});
    },

    render() {
        const self = this;
        const metadata = self.state.currentMetadata;
        const blockFiles = self.props.blockFiles;

        return (
            <div className="file-chain">
                <ListGroup>
                    <ListGroupItem bsStyle="success">File Chain</ListGroupItem>

                    <Columns columns={2}>

                        {blockFiles && blockFiles.map((file, i) => {
                            return <FlipMove key={i}
                                             enterAnimation="accordionHorizontal" leaveAnimation="accordionHorizontal"
                                             duration={500} appearAnimation="accordionVertical">
                                <div className="file-block" onClick={() => self.selectFile(file)}>
                                    <FileDetails file={file}/>

                                </div>
                            </FlipMove>
                        })}
                    </Columns>
                </ListGroup>

                {/* Selected File metadata info modal */}
                <Modal show={self.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Blockchain Metadata File</Modal.Title>
                    </Modal.Header>
                    < Modal.Body >
                        <FileDetails file={metadata}/>
                        <hr/>

                        <Button bsStyle="info">Grant Access</Button>
                        <HelpBlock>Is this your file? Grant Access to other users by clicking here.</HelpBlock>

                        <FormGroup controlId="formBasicText">

                            <ControlLabel>Enter your authorized key to download</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.privateKey}
                                placeholder="Enter key"
                                onChange={this.handleKeyChange}
                            />

                            <FormControl.Feedback />
                        </FormGroup>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="info" onClick={this.download}>Download</Button>
                        <Button bsStyle="danger" onClick={this.handleClose}>Close</Button>
                        {/*<Button bsStyle="danger" onClick={this.handleClose}>Grant Access</Button>*/}
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
});

export default FileChain;

