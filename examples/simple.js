var addr = require('../')
  , http = require('http')
  , port = 3000
  , proxies = ['127.0.0.1']
  ;

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({addr: addr(req, proxies)}));
  res.end();
}).listen(port, function() {
  console.log('test server running on port ' + port);
});