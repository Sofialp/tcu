const cors = require('cors');

const corsOptions = {
  origin: '*',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Content-Length',
    'X-Requested-With',
    'Accept',
    'idtoken',
    'fbtoken',
    'accesstoken',
    'comesfromcronjobswebsite'
  ],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
