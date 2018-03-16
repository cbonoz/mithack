/**
 * Created by cbuonocore on 3/16/18.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import PropTypes from 'prop-types';

const FileChain = createReactClass({


    componentWillMount() {

    },

    render() {
        const self = this;
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
            </div>
        );
    }
});

export default FileChain;

