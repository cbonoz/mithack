/**
 * Created by cbuonocore on 3/16/18.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import neoLogo from '../assets/neo.png'

const Footer = createReactClass({
    render() {
        return (
            <div>
                <p className="centered footer">Powered by the
                    <span className="neo-green">
                        <img src={neoLogo} className="neo-logo"/>
                    </span>
                    Blockchain</p>
            </div>
        );
    }
});

export default Footer;

