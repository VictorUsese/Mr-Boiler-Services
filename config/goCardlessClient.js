const gocardless = require('gocardless-nodejs');

const client = gocardless.Client({
  access_token: process.env.GC_ACCESS_TOKEN,
  environment: 'sandbox', // switch to 'live' in production
});

module.exports = client;
