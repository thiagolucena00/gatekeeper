const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const businessRouter = require('./src/modules/business/business.route');

const pinoInspector = require('pino-inspector')
const pino = require('express-pino-logger')({
    level: 'info',
    prettyPrint: true,
    prettifier: pinoInspector
  });


var bodyParser = require('body-parser');

var app = express();

app.use(pino);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', businessRouter);

module.exports = app;
