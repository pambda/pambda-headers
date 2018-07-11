const test = require('tape');
const { addHeaders } = require('..');

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
