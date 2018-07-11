const { callbackify } = require('lambda-callbackify');

exports.addHeaders = (headers = {}) => {
  return next => {
    next = callbackify(next);

    return (event, context, callback) => {
      next(event, context, (err, result) => {
        if (typeof result.headers === 'object') {
          Object.assign(result.headers, headers);
        }

        callback(err, result);
      });
    };
  };
};
