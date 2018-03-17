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
const fs = require('fs');
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

    // TODO [NEO]: make request to blockchain to retrieve all file metadatas associated with this address.
    const files = [];


    return res.json(files);
});

/** Permissible loading a single file,
 the value of the attribute "name" in the form of "recfile". **/
const type = upload.any();


app.post('/api/authorize', type, function (req, res, next) {
    // req.body contains the text fields
    const privateKey = req.body.privateKey;
    const publicKey = req.body.publicKey;
    const targetAddress = req.body.address;


    const fileName = address + "_" + name;

    // Save the encrypted file to the upload directory, and return success.
    rekeyed.encryptAndSaveFile(fileContent, fileName, key, function (err, results) {

        if (err) {
            console.error('error', err);
            return res.status(500).json(err);
        }

        // TODO [NEO]: Save the metdata for the current file to the Neo blockchain after saved here.


        console.log('results', results);
        return res.json(results);
    });
});


app.post('/api/upload', type, function (req, res, next) {
    // req.body contains the text fields
    const fileContent = req.body.file;
    const metadata = JSON.parse(req.body.metadata);
    // TODO: save these metadata fields to Neo.
    const name = metadata.name;
    const lastModified = metadata.lastModifiedDate;
    const address = metadata.address;
    const fileHash = metadata.hash;
    const key = metadata.key; // TODO: confirm signing authority.
    console.log(fileContent);

    const fileName = address + "_" + name;

    // Save the encrypted file to the upload directory, and return success.
    rekeyed.encryptAndSaveFile(fileContent, fileName, key, function (err, results) {

        if (err) {
            console.error('error', err);
            return res.status(500).json(err);
        }

        // TODO [NEO]: Save the metdata for the current file to the Neo blockchain after saved here.


        console.log('results', results);
        return res.json(results);
    });
});


// TODO: add route for retrieving decrypted file if sufficient permissions.

server.listen(PORT, () => {
    console.log('Express server listening on localhost port: ' + PORT);
});
