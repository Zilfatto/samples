import { compose, pipe } from 'lodash/fp';

const trim = str => str.trim();
const wrapInDiv = str => `<div>${str}</div>`;
const wrapInSpan = str => `<span>${str}</span>`;
const toLowerCase = str => str.toLowerCase();

// The evolution
const result = wrapInDiv(wrapInSpan(toLowerCase(trim(input))));
// The reverse order
let transform = compose(wrapInDiv, wrapInSpan, toLowerCase, trim);
// The right order
let transform = pipe(trim, toLowerCase, wrapInSpan, wrapInDiv);

transform(input);



// Currying
const trim = str => str.trim();
// const wrap = (type, str) => `<${type}>${str}</${type}>`;
const toLowerCase = str => str.toLowerCase();
const wrap = type => str => `<${type}>${str}</${type}>`;

const transform = pipe(trim, toLowerCase, wrap('span'), wrap('div'));
transform(input);




// Pure function
// Yes
function myFuncion(number) {
  return number * 2;
}
// Not
function myFuncion(number) {
  return number * Math.random();
}
// In pure it is not allowed:
// Random values
// Current data/time
// Global state (DOM, files, db, etc)
// Mutation of parameters

function isEligible(age) {
  return age > minAge;
}

function isEligible(age, minAge) {
  return age > minAge;
}

// Benefits:
// Self-documenting
// Easily testable
// Concurrency (Can be called them in parallel)
// Cacheable (Especially for functionas with intensive computation)




// Immutability
let name = 'My name';
let newName = name.toUpperCase();

const book = {};
book.title = '...';


// Objects
let person = { name: 'John' };

let updated = Object.assign({}, person, { name: 'Frank', age: 30 });
let updated = { ...person, name: 'Frank', age: 30 };

const person = {
  name: 'John',
  address: {
    country: 'USA',
    city: 'Los Angeles'
  }
};

let updated = { ...person, name: 'Bob' };
// Both updated and person has the same address object as a property
// Deep copying
let updated = {
  ...person,
  name: 'Bob',
  address: {
    ...person.address,
    city: 'New York'
  }
};



// Arrays
const numbers = [1, 2, 3];

// Adding
let added = [...numbers, 4];

// At a specific position
const index = numbers.indexOf(2);
let added = [
  ...numbers.slice(0, index),
  4,
  ...numbers.slice(index)
];

// Removing
const removed = numbers.filter(n => n !== 2);

// Updating
let updated = numbers.map(n => n === 2 ? 20 : n);