const path = require('path')
const express = require('express')

const port = 8000

const app = express()

// Initialize the main project folder
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

app.listen(port, function () {
    console.log(`app listening on port ${port}!`)
});