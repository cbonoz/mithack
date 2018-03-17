/**
 * Created by cbuonocore on 3/16/18.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

const About = createReactClass({
    render() {
        return (
            <div className="centered about-page">

                <div className="about-section centered">
                    <h1>About Us</h1>

                    <p>"Rekeyed" is an accountless IPFS distributed/open file storage platform backed by the neo
                        blockchain.</p>

                    <p>Hashes of documents, and other metadata, are stored on the Neo blockchain. Files are stored
                        separatedly. We are not creating a token, but rather using Neo's immutable blockchain to record
                        metadata, permissions, and proof of ownership that can be queried and used for permission/access
                        control through our front end UI.</p>

                    <p>IPFS is used for the internal implementation of the filestorage.

                    </p>
                </div>

            </div>
        );
    }
});

export default About;

