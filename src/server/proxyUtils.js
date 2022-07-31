const decoratePublicRequestHeaders = function () {
  return function (proxyReqOpts, srcReq) {
      return proxyReqOpts;
  }
}

module.exports.decoratePublicRequestHeaders = decoratePublicRequestHeaders;
