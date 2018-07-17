const test = require('tape');
const {
  addHeaders,
  lowerCaseHeaders,
} = require('..');

test('test addHeaders', t => {
  t.plan(2);

  const lambda = addHeaders({
    foo: 1,
  })((event, context, callback) => {
    callback(null, {
      headers: {
        bar: 2,
      },
    });
  });

  lambda({}, {}, (err, data) => {
    t.error(err);

    t.deepEqual(data, {
      headers: {
        foo: 1,
        bar: 2,
      },
    });
  });
});

test('test lowerCaseHeaders', t => {
  t.plan(2);

  const lambda = lowerCaseHeaders()((event, context, callback) => {
    t.equal(event.headers['content-type'], 'text/plain');

    callback(null);
  });

  lambda({
    headers: {
      'Content-Type': 'text/plain',
    },
  }, {}, (err, data) => {
    t.error(err);
  });
});
