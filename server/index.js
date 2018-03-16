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
// const https = require('https');
// const pg = require('pg');

const PORT = 9001;

const app = express();
const server = http.createServer(app);
// const io = require('socket.io')(server, {origins: '*:*'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// TODO: use reduced cors in production.
// const whitelist = ['https://vocalcoin.com', 'https://www.vocalcoin.com'];
// app.use(cors({ origin: whitelist }));

app.use(cors());

app.get('/api/hello', (req, res) => {
    return res.json("hello world");
});

server.listen(PORT, () => {
    console.log('Express server listening on localhost port: ' + PORT);
});
