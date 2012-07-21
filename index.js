
module.exports = function addr(req, proxies) {
  if (!req.headers['x-forwarded-for']) {
    return req.connection.remoteAddress;
  }
  if (typeof proxies === 'string') {
    proxies = [proxies];
  }
  if (proxies && proxies.indexOf(req.connection.remoteAddress) === -1) {
    // Don't honor the x-forwarded-for header if request is not from a trusted
    // source.
    return req.connection.remoteAddress;
  }
  return req.headers['x-forwarded-for'].split(/\s?,\s?/).shift();
};
