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
const neonjs = require('@cityofzion/neon-js');

// const https = require('https');
// const pg = require('pg');

const PORT = 9001;

const app = express();
const server = http.createServer(app);
// const io = require('socket.io')(server, {origins: '*:*'});



const rekeyed = require('./rekeyed');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(cors());

app.get('/api/hello', (req, res) => {
    return res.json("hello world");
});

server.listen(PORT, () => {
    console.log('Express server listening on localhost port: ' + PORT);
});
