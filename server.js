const express = require('express');
const morgan = require('morgan');
const app = express();
const localsRouter = require('./api/locals');
app.use(express.json());
app.use(morgan('combined'));
app.use('/locals', localsRouter);
app.listen(3000, () => console.log('Ready on port 3000!'));
