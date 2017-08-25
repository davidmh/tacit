const util = require('util');

module.exports = (...args) =>
  console.log(
    ...args.map(
      x => util.inspect(x, {
        depth: null,
        colors: true,
      }))
  );

