const test = require('tape');
const range = require('./index');

test('it creates a source that emits a range of numbers then completes', t => {
  t.plan(14);
  const downwardsExpectedType = [
    [0, 'function'],
    [1, 'number'],
    [1, 'number'],
    [1, 'number'],
    [2, 'undefined']
  ];

  const downwardsExpected = [0, 1, 2];

  function sink(type, data) {
    const et = downwardsExpectedType.shift();
    t.equals(type, et[0], 'downwards type is expected: ' + et[0]);
    t.equals(typeof data, et[1], 'downwards data type is expected: ' + et[1]);
    if (type === 0) {
      sink.ask = data;
    } else if (type === 1) {
      const e = downwardsExpected.shift();
      t.equals(data, e, 'downwards data is expected: ' + e);
    }
    if (type === 0 || type === 1) sink.ask(1);
  }

  range(0, 2)(0, sink);

  t.pass('nothing else happens');
  t.end();
});

test('it creates a source that throws if the step is zero', t => {
  t.plan(1);
  t.throws(() => {
    range(0, 2, 0);
  }, 'throws Step cannot be zero');
  t.end();
});

test('it creates a source that throws if the inputs are not numbers', t => {
  const throwsMsg = 'throws Arguments must be numbers';
  t.plan(7);
  t.throws(() => {
    range(0, '2');
  }, throwsMsg, 'end boundary must be number');
  t.throws(() => {
    range('0', 2);
  }, throwsMsg, 'start boundary must be number');
  t.throws(() => {
    range(0, 2, '1');
  }, throwsMsg, 'step must be number');
  t.throws(() => {
    range(0, Infinity);
  }, throwsMsg, 'only finite numbers');
  t.throws(() => {
    range(0, NaN);
  }, throwsMsg, 'NaN is not considered as number');
  t.throws(() => {
    range(0, null);
  }, throwsMsg, 'null is not accepted as number');
  t.throws(() => {
    range(0, undefined);
  }, throwsMsg, 'undefined is not accepted as number');
  t.end();
});
