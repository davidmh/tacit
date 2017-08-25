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

There are only two types of people in the world:
================================================

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

```JavaScript
const double = x => x * x;
const toUpper = x => x.toUpperCase();
```

2. Unary
```JavaScript
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

A Functor is a type that implements map and obeys some laws+


Links


[Professor Frisby's Mostly Adequate Guide to Functional Programming](https://drboolean.gitbooks.io/mostly-adequate-guide/)

[The Algebra of Algebraic Data Types](http://chris-taylor.github.io/blog/2013/02/10/the-algebra-of-algebraic-data-types/)
