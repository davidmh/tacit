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

There are only two types of people in the world
===============================================

1. Those who can extrapolate from incomplete data.

Pipe
====

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

Not all functions should be unary.

Currying
========

Partial application of a variadic function into a fixed number of values

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
