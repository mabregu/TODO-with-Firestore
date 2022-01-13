require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`App listening at http://${host}:${port}`)
})