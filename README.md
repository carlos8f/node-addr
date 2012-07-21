addr
====

Get the remote address of a request, with reverse-proxy support

Usage
=====

```bash
$ npm install addr
```

`addr(req, [proxies])`

- `req`: an `http.ServerRequest` object.
- `proxes`: an array of IP addresses of trusted proxies. If specified and
  the request doesn't come from one of these addresses, `false` will be returned.
- Returns: Remote IP address of the request, taken from the `X-Forwarded-For`
  header if it exists and the request is coming from a trusted proxy.

Example
=======

```javascript
var addr = require('addr')
  , http = require('http')
  , port = 3000
  , proxies = ['127.0.0.1', '1.2.3.4']
  ;

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({addr: addr(req, proxies)}));
  res.end();
}).listen(port, function() {
  console.log('test server running on port ' + port);
});
```

License
=======

MIT