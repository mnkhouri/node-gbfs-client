const https = require('https');
const http  = require('http');

// Promisified http(s) get
const get = function(url) {
  return new Promise((resolve, reject) => {

    const client = url.startsWith('https') ? https : http;

    client.get(url, (res) => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        reject(new Error(`Failure: status code ${res.statusCode}`));
      }

      const body = [];
      res.on('data', (chunk) => body.push(chunk));
      res.on('end', () => resolve(body.join('')));

    }).on('error', (err) => reject(err));
  })
}

module.exports = {
  get: get
}
