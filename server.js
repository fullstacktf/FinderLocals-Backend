const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const methodOverride = require('method-override');
const notifier = require('node-notifier');
const session = require('express-session'); 
const rateLimit = require("express-rate-limit");
const app = express();
const localsRouter = require('./api/locals');
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, 
    message:
    "Too many requests,  please try again after an hour"
});
app.use(apiLimiter);
app.use(express.json());
app.use(session({ secret: '1234' }));
app.use(morgan('combined'));
app.use(compression());
app.use('/locals', localsRouter);

function errorHandler(err, req, res, next) {
    if (!err) { 
        return next(); 
    } 
    if (err) {
    const message = `Error en ${req.method} ${req.url}`;
    notifier.notify({ title: 'Error', message });
    res.status(500).send('Algo se ha roto');
    }   
}

if (process.env.NODE_ENV === 'development') {
    app.use(methodOverride());
    app.use(errorHandler);
}
app.listen(3000, () => console.log('Ready on port 3000!'));
