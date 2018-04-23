const range = (from, to, step = 1) => {
  if (step === 0) throw 'Step cannot be zero';
  if (isNaN(from) || isNaN(to)) throw 'Arguments must be numbers';
  let sent = from - step;
  let sink;
  const source = (t, d) => {
    if (t === 0) {
      sink = d;
      sink(0, source);
    }
    if (t === 1) {
      sent += step;
      (to > from && sent <= to) || (to < from && sent >= to) ? sink(1, sent) : sink(2);
    }
  };
  return source;
};

module.exports = range;
