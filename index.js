const fromIter = require('callbag-from-iter');

const isNumber = n => n != null && !isNaN(n) && isFinite(n) && n.constructor === Number;

const checkArgs = (from, to, step) => {
  if (step === 0) {
    throw new Error('Step cannot be zero');
  }
  if (!isNumber(from) || !isNumber(to) || !isNumber(step)) {
    throw new Error('Arguments must be numbers');
  }
  if (from > to && step > 0) {
    throw new Error('Descending range must have negative step. Got +' + step);
  }
};

const isProd = process.env.NODE_ENV === 'production'

const range = (from, to, step = 1) => {
  if (!isProd) {
    checkArgs(from, to, step);
  }

  let value = from - step;

  return fromIter({
    next() {
      value += step;

      if (to > from ? value > to : value < to) {
        return { value: undefined, done: true };
      }

      return { value, done: false };
    },
  });
};

module.exports = range;
