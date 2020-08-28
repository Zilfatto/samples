// ###
// Logical operators
let highIncome = false;
let goodCreditScore = true;
let eligibleForLoan = highIncome || goodCreditScore;
console.log('Eligible', eligibleForLoan);
let applicationRefused = !eligibleForLoan;
console.log('Application Refused', applicationRefused);


// Logical operators with non-booleans
// Falsy (false) --- undefined, null, 0, false, '', NaN
// in console
false || true; // true
false || 'Mosh'; // "Mosh"
false || 1; // 1
false || 1 || 2; // 1

let userColour = 'red';
let defaultColour = 'blue';
userColour = undefined; // pissible case
let currentColour = userColour || defaultColour;



// ## Control flow ##
// If...else
let hour = 10;

if (hour >= 6 && hour < 12)
  console.log('Good morning');
else if (hour >= 12 && hour < 18)
  console.log('Good afternoon');
else
  console.log('Good evening');


// exercise - Prime numbers
showPrimes(20);

function showPrimes(limit) {
  for (let number = 2; number <= limit; number++)
    if (isPrime(number)) console.log(number);
}
// Single responsibility principle
function isPrime(number) {
  for (let factor = 2; factor < number; factor++)
    if (number % factor === 0)
      return false;

  return true;
}


// ## Objects ##
// Date
const now = new Date();
const date1 = new Date('May 11 2018 09:00');
const date2 = new Date(2018, 4, 11, 9);
now.setFullYear(2017);
now.toDateString(); // "Thu May 11 2017"
now.toTimeString(); // "11:35:01 GMT-0700 (PDT)"
// Commonly used in web apps to talk to the backend
now.toISOString(); // "2017-05-11T18:35:01.212Z"



// ## Arrays ##
// Adding / Removing elements
const numbers = [3, 4];
// End
numbers.push(5, 6);
// Beginning
numbers.unshift(1, 2);
// Middle
numbers.splice(2, 0, 'a', 'b');

const otherNumbers = [1, 2, 3, 4];
// End
const last = otherNumbers.pop();
// Beggining
const first = otherNumbers.shift();
// Middle
const middle = otherNumbers.splice(1, 1); // returns an array


// Finding
const numbers = [1, 2, 3, 1, 4];
numbers.indexOf(1); // 0
numbers.indexOf(1, 2); // 3
numbers.lastIndexOf(1); // 3
numbers.includes(1); // true

const courses = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' }
];
// returns the first object (reference) whick matches the criteria, otherwise - undefined
const course = courses.find(function (course) {
  return course.name === 'a';
});
// return -1 if not found
const courseIndex = courses.findIndex(function (course) {
  return course.name === 'a';
});


// Emptying
let numbers = [1, 2, 3, 4];
let another = numbers;
// Solution 1 (if there is only 1 reference to an array)
numbers = [];
// Solution 2
numbers.length = 0;
// Solution 3
numbers.splice(0, numbers.length);
// Solution 4
while (numbers.length > 0)
  numbers.pop();


// Combining and slicing
// for primitives
const first = [1, 2, 3];
const second = [4, 5, 6];
const combined = first.concat(second); // [1, 2, 3, 4, 5, 6]
const slice = combined.slice(2, 4); // [3, 4]
const slice = combined.slice(2); // [3, 4, 5, 6]
const slice = combined.slice(); // [1, 2, 3, 4, 5, 6]
// reference names
const first = [{ id: 2 }];
// copied by the reference


// Joining
const numbers = [1, 2, 3];
const joined = numbers.join(',');
console.log(joined); // "1,2,3"

const message = 'This is my first message';
const parts = message.split(' ');
console.log(parts); // ["this", "is", "my", "first", "message"]

const combined = parts.join('-');
console.log(combined); // "This-is-my-first-message"
// Useful when building a URL slug


// Sorting arrays
const numbers = [2, 1, 3];
numbers.sort((a, b) => a - b);
// reversing
numbers.reverse();

// for objects
const courses = [
  { id: 1, name: 'Node.js' },
  { id: 2, name: 'JavaSript' }
];

courses.sort((a, b) => {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
});


// Mapping
const nunmbers = [1, -1, 2, 3];
const filtered = numbers.filter(n => n >= 0);
const items = filtered.map(n => `<li>${n}</li>`);
const html = `<ul>${items.join('')}</ul>`;
console.log(html);
// Chaining methods
const items = numbers
  .filter(n => n >= 0)
  .map(n => { { value: n } })
  .filter(obj => obj.value > 1)
  .map(obj => obj.value);
console.log(items);


// Reducing
const numbers = [1, -1, 2, 3];

let sum = 0;
for (let n of numbers)
  sum += n;
console.log(sum);
// Cleaner way. Converting all the valus into a single value
// a = 0, c  = 1 => a = 1
// a = 1, c = -1 => a = 0
// a = 0, c = 2 => a = 2
// a = 2, c = 3 => a = 5
const sum = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue, 0
);
console.log(sum);
// If exlude the initialisation, then accumulator wil be set to the first value numbers[0]
// a = 1, c = -1 => a = 0
// a = 0, c = 2 => a = 2
// a = 2, c = 3 => a = 5
const sum = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue
);


// Moving elements
const numbers = [1, 2, 3, 4];
const outpur = move(numbers, 0, 2);

function move(array, index, offset) {
  const position = index + offset;
  if (position >= array.length || position < 0) {
    console.error('Invalid offset.');
    return;
  }

  const output = [...array];
  const element = output.splice(index, 1)[0];
  output.splice(possition, 0, element);
  return output;
}


// Count occurrences
const numbers = [1, 2, 3, 4, 1];
const count = countOccurrences(numbers, -1);
// Old way
function countOccurrences(array, searchElement) {
  let count = 0;
  for (let element of array)
    if (element === searchElement)
      count++;
  return count;
}
// Modern and cleaner way
function countOccurrences(array, searchElement) {
  return array.reduce((accumulator, current) => {
    const occurrence = (current === searchElement) ? 1 : 0;
    return accumulator + occurrence;
  }, 0);
}


// Get max
const numbers = [1, 2, 3, 4];
const max = getMax(numbers);
// Old way
function getMax(array) {
  if (array.length === 0)
    return undefined;
  let max = array[0];
  const arrLen = array.length;
  for (let i = 1; i < arrLen; i++)
    if (array[i] > max)
      max = array[i];

  return max;
}
// Using reduce
function getMax(array) {
  if (array.length === 0) return undefined;
  return array.reduce((a, b) => (a > b) ? a : b);
}


// Movies
const movies = [
  { title: 'a', year: 2018, rating: 4.5 },
  { title: 'b', year: 2018, rating: 4.7 },
  { title: 'c', year: 2018, rating: 3 },
  { title: 'd', year: 2017, rating: 4.5 },
];

const titles = movies
  .filter(m => m.year === 2018 && m.rating >= 4)
  .sort((a, b) => a.rating - b.rating)
  .reverse()
  .map(m => m.title);
console.log(titles);


// Try and Catch
const person = {
  firstName: 'Mosh',
  lastName: 'Hamedani',
  set fullname(value) {
    if (typeof value !== 'string')
      throw new Error('Value is not a string');

    const parts = value.split(' ');
    if (parts.length !== 2)
      throw new Error('Enter a first and last name');

    this.firstName = parts[0];
    this.lastName = parts[1];
  }
};

try {
  person.fullName = null;
  // or person.fullName = '';
}
catch (e) {
  alert(e.message);
}


// Error Handling
try {
  const numbers = [1, 2, 3, 4, 1];
  const count = countOccurrences(null, -1);
}
catch (e) {
  console.log(e.message);
}

function countOccurrences(array, searchElement) {
  if (!Array.isArray(array))
    throw new Error('Invalid array');

  return array.reduce((accumulator, current) => {
    const occurrence = (current === searchElement) ? 1 : 0;
    return accumulator + occurrence;
  }, 0);
}