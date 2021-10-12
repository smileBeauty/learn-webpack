const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.use('/', (req, res) => {
    console.log(req.url);
});

app.use('/project/sourcemaps', express.static('dist'));

app.listen(9999);