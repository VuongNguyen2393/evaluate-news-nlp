var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

console.log(__dirname);

// Variables for url and api key
var apiKey = process.env.API_KEY;

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
});


// POST Route
const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1';
app.post('/url', async(req, res) => {
    try{
        const response = await fetch(`${baseUrl}?key=${apiKey}&url=${req.body.newsUrl}&lang=auto`);
        const data = await response.json();
        res.send(data);
    }catch(error){
        console.log('errorRetrieveData', error);
    }
})

// Designates what port the app will listen to for incoming requests
const port = process.env.PORT;
app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});


