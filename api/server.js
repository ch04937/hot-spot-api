const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//tesing server
server.get('/', (req, res) => {
    res.send('api is running')
})

module.exports = server;