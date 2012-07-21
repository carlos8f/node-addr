
module.exports = function addr(req, proxies) {
  if (!req.headers['x-forwarded-for']) {
    return req.connection.remoteAddress;
  }
  if (typeof proxies === 'string') {
    proxies = [proxies];
  }
  if (proxies && proxies.indexOf(req.connection.remoteAddress) === -1) {
    return false;
  }
  var addrs = req.headers['x-forwarded-for'].split(/\s?,\s?/);
  var ip = addrs.shift();
  if (proxies) {
    var proxy;
    while (proxy = addrs.pop()) {
      if (proxies.indexOf(proxy) === -1) {
        return false;
      }
    }
  }
  return ip;
};
