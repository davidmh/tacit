const curry = (fn, ...args) => {
  if (args.length >= fn.length) {
    return fn(...args);
  }
  const partial = (...partialArgs) =>
    curry(...[fn, ...args, ...partialArgs]);
  partial.inspect = () => {
    const verboseParams = args
      .map(x => x.inspect && x.inspect() || JSON.stringify(x))
      .join();
    return `${fn.name || fn.toString()}(${verboseParams}, ← )`;
  }
  return partial;
};

module.exports = curry;
