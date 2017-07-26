const assert = require('assert');
const http = require('http');
const httpClient = require('../lib/http');
const GbfsClient = require('../lib/gbfs');
const gbfsClient = new GbfsClient();

const TEST_SERVER_PORT = 8080;
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.write('hi');
  res.end();
});
server.listen(TEST_SERVER_PORT)

describe('httpClient', function () {
  describe('#get()', function () {
    it('succeeds on http success', function () {
      return httpClient.get(`http://127.0.0.1:${TEST_SERVER_PORT}`)
        .then(function (data) {
          assert.equal(data, 'hi');
        })
    })
    it('rejects on http failure', function () {
      return httpClient.get('http://invalidUrl.invalidTld')
        .catch(function (err) {
          assert.equal(err.code, 'ENOTFOUND');
        })
    })
    it('rejects on http status != 2xx', function () {
      return httpClient.get('https://google.com')
        .catch(function (err) {
          assert.equal(err.message, 'Failure: status code 301');
        })
    })
  })
})

describe('gbfsClient', function () {
  describe('#stations()', function () {
    it('returns stations', function () {
      return gbfsClient.stations()
        .then(function (stations) {
          assert.notEqual(stations[0].station_ids, undefined);
        })
    })
  })
})
