Just in like bash
=================

You can write this

```bash
echo "Edward,Chris,Gabriel,Erika,David" | tr , \n | grep -e "^E" | xargs | tr \  ,
```

Or create a reusable alias

```bash
alias getNamesStartingWithE="tr , \\\n | grep -e \"^E\" | xargs | tr \  ,"
```

And use it
```bash
echo "Elaine,Jerry,George,Eric" | getNamesStartingWithE
```

Compose
=======

Suppose we have two functions `f` and `g`

Composing them means we first compute `y = g(x)`, and then
use `y` to compute `z = f(y)`


In JavaScript
=============

We can do this
```javascript
const y = g(x);
const z = f(y);
```

Or if those two functions are useful together frequently

```javascript
const foo = y => f(g(y));
const z = foo(x);
const z2 = foo(x2);
// ... etc
```

Or

```javascript
const foo = compose(f, g);
// foo is the `f` of `g` of something
```

In Haskell

```haskell
foo = f . g
```

Pipe
====

`compose` consumes the functions right-to-left, `pipe` does it left-to-right

Which reads a bit closer to what we are used to in both JavaScript and Bash

```javascript
const foo = pipe(g, f);
// foo applies `g`, then `f` to something
```

The Pipeline Operator
=====================


[ESNext Proposal: The Pipeline Operator](https://github.com/tc39/proposal-pipeline-operator)

 It's a backwards-compatible way of streamlining chained function calls in a
 readable, functional manner, and provides a practical alternative to extending
 built-in prototypes.

Rules
=====

Your functions need to be:

1. Predictable.

```javascript
const double = x => x * x;
const toUpper = x => x.toUpperCase();
```

2. Unary
```javascript
const map = fn => list => list.map(fn);
const filter = fn => list => list.filter(fn);

const doubleAll = map(double);
// doubleAll is a function ready to receive an array
```

Caveats
=======

Not all functions are unary.

Currying
========

Partial application of a variadic function into a fixed number of values

```javascript
const replace = curry(
  (exp, replacement, str) => str.replace(exp, replacement)
);

const bananafy = replace(
  /\w/g,
  (match, i) => ((i + 1) % 3 === 0)
    ? 'banana'
    : match;
);


bananafy('Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.')
```

Functors beyond arrays
======================

A Functor is a type that implements map and obeys some laws

Links
=====

- [Ramda](http://ramdajs.com)
  Like lodash, but all functions are curried and pointfree.

- [Folktale](http://folktale.origamitower.com/)
  A standard library for functional programming in JavaScript

- [Professor Frisby's Mostly Adequate Guide to Functional Programming](https://drboolean.gitbooks.io/mostly-adequate-guide/)
  A full guide for FP in JS.

- [The Elm Architecture](https://guide.elm-lang.org/architecture/)
  Shh, just read it. Trust me.

- [Learn You a Haskell for Great Good](http://learnyouahaskell.com/)
  A beginner's guide.
