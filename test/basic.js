var addr = require('../')
  , assert = require('assert')
  , http = require('http')
  , request = require('request')
  , port = 55221
  , baseUrl = 'http://localhost:' + port
  ;

describe('basic test', function() {
  before(function(done) {
    http.createServer(function(req, res) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      var proxies = (req.url === '/not-trusted') ? '127.0.0.1' : null;
      res.write(JSON.stringify({addr: addr(req, proxies)}));
      res.end();
    }).listen(port, done);
  });
  it('returns a valid ip', function(done) {
    request({url: baseUrl + '/', json: true}, function(err, res, data) {
      assert.equal(res.statusCode, 200);
      assert(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.exec(data.addr));
      done();
    });
  });
  it('returns a proxy ip', function(done) {
    request({url: baseUrl + '/', headers: {'X-Forwarded-For': '55.55.55.55, 1.2.3.4,5.6.7.8'}, json: true}, function(err, res, data) {
      assert.equal(res.statusCode, 200);
      assert.strictEqual(data.addr, '55.55.55.55');
      done();
    });
  });
});
