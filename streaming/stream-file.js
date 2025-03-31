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

app.use(cors()); // Allow frontend to access backend
app.use(express.static(path.join(__dirname, "public")));
const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
};

const server = http2.createSecureServer(options, app);
const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// **Route: Generate Pre-signed URL**
app.get('/generate-url', async (req, res) => {
    const fileName = req.query.fileName;
    const fileType = req.query.fileType;

    if (!fileName || !fileType) {
        return res.status(400).json({ error: "Missing fileName or fileType" });
    }

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `uploads/${Date.now()}-${fileName}`,
        ContentType: fileType,
        Expires: 60, // URL expires in 60 seconds
    };

    try {
        const uploadURL = await s3.getSignedUrlPromise('putObject', params);
        res.json({ uploadURL, filePath: params.Key });
    } catch (error) {
        console.error('Error generating pre-signed URL:', error);
        res.status(500).json({ error: "Failed to generate URL" });
    }
});


app.listen(3000, () => console.log('Server running on http://localhost:3000'));
// server.listen(3000, ()=> {
//     console.log('started server on port 3000');
// })
