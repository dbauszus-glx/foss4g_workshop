const port = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const app = express();
app.use('/workshop',
    express.static(
        path.join(
            __dirname, 'public'
        )));
app.use(cookieParser());
app.use(
    favicon(
        path.join(
            __dirname, 'public', 'favicon.ico'
        )));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/workshop', require('./router'));
app.listen(port);
console.log('The magic happens on port ' + port);