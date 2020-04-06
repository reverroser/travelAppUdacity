import express from 'express';
const app = express();

app.get('/', function (req, res) {
    res.send('Hello world!');
});

app.listen(8000, function () {
    console.log('app listening on port 5000!')
});