'use strict';

const express = require("express"),
    cors = require('cors'),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    app = express(),
    email = require('./email');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const allowedOrigins = ['http://localhost','http://localhost:4200','https://www.lrcleaningservice.us'];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: 'POST,OPTIONS',
  optionsSuccessStatus: 200,
  allowHeaders:['Content-Type: application/json; charset=UTF-8']
}

var router = express.Router();
router.use(cors(corsOptions));
router.post('/send', function(req, res) {
  email.sendEmail(req.body, function(callbak){
    res.send(callbak);
  });
});

app.use(router);

//app.listen(PORT, HOST, function() {
//  console.log(`Running on http://${HOST}:${PORT}`);
//});

var privateKey  = fs.readFileSync('privkey.pem', 'utf8');
var certificate = fs.readFileSync('fullchain.pem', 'utf8');
var chain = fs.readFileSync('chain.pem','utf8');
var credentials = {key: privateKey, cert: certificate, ca: chain};

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT, HOST, function() {
  console.log(`Running on https://${HOST}:${PORT}`);
});




