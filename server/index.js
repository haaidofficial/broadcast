const http = require('http');
const express = require('express');
const socket = require('./scoket/socket');

const PORT = 5000;
const app = express();
const httpServer = http.createServer(app);

socket(httpServer);


httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});


