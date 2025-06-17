'use strict';

const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
   res.send('Technologie Webowe w Aplikacjach Internetu');
});

app.listen(PORT, function () {
   console.info(`Server is running at ${PORT} on ${HOST}`)
});
