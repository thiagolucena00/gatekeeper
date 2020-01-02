const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('config');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const pinoInspector = require('pino-inspector')
const pino = require('express-pino-logger')({
    level: 'info',
    prettyPrint: true,
    prettifier: pinoInspector
  });

const businessRouter = require('./src/modules/business/business.route');

var app = express();

app.use(pino);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', businessRouter);

mongoose.Promise = global.Promise;
mongoose.connect(config.get('connectionString'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
    .once('open', () => console.log('Mongodb connected!'))
    .on('error', (error) => {
        console.warn('Error : ', error);
    });

module.exports = app;
