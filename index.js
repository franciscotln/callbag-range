const isNumber = n => n != null && !isNaN(n) && isFinite(n) && n.constructor === Number;

const range = (from, to, step = 1) => {
  if (step === 0) throw 'Step cannot be zero';
  if (!isNumber(from) || !isNumber(to) || !isNumber(step)) throw 'Arguments must be numbers';
  let sent = from - step;
  let sink;
  let end;
  const source = (t, d) => {
    if (end) return;
    if (t === 0) {
      sink = d;
      sink(0, source);
    }
    if (t === 1) {
      sent += step;
      if ((to > from && sent <= to) || (to < from && sent >= to)) {
        sink(1, sent);
      } else if (!end) {
        sink(2);
        end = true;
      }
    }
  };
  return source;
};

module.exports = range;
