const { callbackify } = require('lambda-callbackify');

const headersProcessor = (options = {}) => {
  return next => {
    const {
      req: reqHandler,
      res: resHandler,
    } = options;

    next = callbackify(next);

    if (resHandler !== undefined) {
      const originalNext = next;
      next = (event, context, callback) =>
        originalNext(event, context, (err, result) => {
          if (err) {
            return callback(err, result);
          }

          if (typeof result.headers === 'object') {
            result.headers = resHandler(result.headers);
          }

          callback(err, result);
        });
    }

    if (reqHandler === undefined) {
      return next;
    }

    return (event, context, callback) => {
      if (typeof event.headers === 'object') {
        event.headers = reqHandler(event.headers);
      }

      next(event, context, callback);
    };
  };
};

exports.headersProcessor = headersProcessor;

exports.addHeaders = (headers = {}) =>
  headersProcessor({
    res: resultHeaders =>
      Object.assign(resultHeaders, headers),
  });

exports.lowerCaseHeaders = () =>
  headersProcessor({
    req: headers =>
      Object.keys(headers).reduce(
        (result, key) => (result[key.toLowerCase()] = headers[key], result),
        {}),
  });
