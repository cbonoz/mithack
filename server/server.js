/**
 * Created by cbuonocore on 3/16/18.
 */

'use strict';
// Server code for vocal project.
// Author: Chris Buonocore (2017)
// License: Apache License 2.0

const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
// https://github.com/expressjs/multer
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

// const https = require('https');
// const pg = require('pg');

const PORT = 9001;

const app = express();
const server = http.createServer(app);
// const io = require('socket.io')(server, {origins: '*:*'});

const neon = require('./neon');
const rekeyed = require('./rekeyed');

// neon.saveFileMetadata(args....).then()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(cors());

app.get('/api/hello', (req, res) => {
    return res.json("hello world");
});

// Return a list of files associated with the given address.
app.get('/api/files/:address', (req, res) => {
    const address = req.params.address;
    console.log('address');
    const files = [];

    // TODO [NEO]: make request to blockchain for file metadatas associated with this address.


    return res.json(files);
});

app.post('/api/upload', upload.array(), function (req, res, next) {
    // req.body contains the text fields
    console.log('req', req);
    const file = req.body.file;
    const metadata = req.body.metadata;

    // TODO [NEO]: Save the metdata for the current file to the Neo blockchain.

    // Save the encrypted file to the upload directory, and return success.
    rekeyed.encryptAndSaveFile(file, metadata, () => {
        return res.json("success");
    });
});


// TODO: add route for retrieving decrypted file if sufficient permissions.

server.listen(PORT, () => {
    console.log('Express server listening on localhost port: ' + PORT);
});
