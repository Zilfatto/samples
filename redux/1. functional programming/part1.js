// Functions as First-class citizens. They can be treated like any other variables
function sayHello() {
  return function () {
    return 'Hello World!';
  };
}

let fn = sayHello();
let message = fn();


// Higher order Functions
function greet(fn) {
  console.log(fn());
}

function sayHello() {
  return function () {
    return 'Hello World';
  };
}

const numbers = [1, 2, 3];
numbers.map(number => number * 2);

setTimeout(() => console.log('Hello'), 1000);


// Function Composition
// (write a bunch of small and reusable functions and then compose them
// to build more complex functions for solving real world problems)

// Not functional style of code
let input = '       JavaScript         ';
let output = `<div>${input.trim().toLowerCase()}</div>`;

// trim
// wrapINDiv
const trim = str => str.trim();
const wrapInDiv = str => `<div>${str}</div>`;
const toLowerCase = str => str.toLowerCase();

const result = wrapInDiv(toLowerCase(trim(input)));