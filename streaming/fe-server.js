require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const path = require("path");
const app = express();
const http2 = require("http2");
const fs = require("fs");
// Create an HTTP/2 Cleartext Server (h2c)
// const server = http2.createServer({}, app);
const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
};
const secureServer = http.createSecureServer(options);

// app.use(cors()); // Allow frontend to access backend
// app.use(express.static(path.join(__dirname, "public")));
// const options = {
//     key: fs.readFileSync("key.pem"),
//     cert: fs.readFileSync("cert.pem")
// };

const server = http2.createSecureServer(options, app);
server.listen(3001, ()=> {
    console.log('started server on port 3001');
})
