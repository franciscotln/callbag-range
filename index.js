const isNumber = n => n != null && !isNaN(n) && isFinite(n) && n.constructor === Number;

const checkArgs = (from, to, step) => {
  if (step === 0) {
    throw new Error('Step cannot be zero');
  }
  if (!isNumber(from) || !isNumber(to) || !isNumber(step)) {
    throw new Error('Arguments must be numbers');
  }
};

const range = (from, to, step = 1) => {
  checkArgs(from, to, step);
  return (start, sink) => {
    if (start !== 0) return;
    let sent = from - step;
    let ended = false;
    let inLoop = false;
    const loop = () => {
      inLoop = true;
      while (got1 && !ended) {
        got1 = false;
        sent += step;
        if ((to > from && sent <= to) || (to < from && sent >= to)) {
          sink(1, sent);
        } else {
          ended = true;
          sink(2);
        }
      }
      inLoop = false;
    };

    sink(0, t => {
      if (ended) return;
      if (t === 1) {
        got1 = true;
        if (!inLoop) loop();
      }
      if (t === 2) {
        ended = true;
      }
    });
  };
};

module.exports = range;
