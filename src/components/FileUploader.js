/**
 * Created by cbuonocore on 3/16/18.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import {FilePond, File} from 'react-filepond';
import PropTypes from 'prop-types';

const FileUploader = createReactClass({

    componentWillMount() {
        this.setState({
            files: []
        })

    },

    handleInit() {
        console.log('now initialised', this.pond);
    },

    handleProcessing(fieldName, file, metadata, load, error, progress, abort) {
        // handle file upload
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


            </div>
        );
    }
});

export default FileUploader;

