// ### Property descriptors ###

let person = { name: 'Name' };
console.log(person);  // here it is possible to find properties defined on its __proto__

for (let key in person)
  console.log(key); // Shows only "name"

console.log(Object.keys(person)); // Shows the same
// We cannot iterate over all properties including defined on the Object.prototype
// It's because properties have attributes attached to them

let objectBase = Object.getPrototypeOf(person);
// To show attributes attached to the "toString" method
let descriptor = Object.getOwnPropertyDescriptor(objectBase, 'toString');
console.log(descriptor);
// It will show
// {value: f, writable: true, enumerable: false, configurable: true}
// configurable: true   - says  that this method can be deleted
// enumerable: false    - says that this method can be iterated
// writable: true       - says that this method can be overwritten, implementation can be changed
// value: f toString()  - it set to a method, here we have the default implementation of the "toString" method

// Creating our own objects we can set these attributes for our properties
let person = { name: 'Name' };
// Writable
Object.defineProperty(person, 'name', {
  writable: false
});
person.name = 'John';
console.log(person); // name is not changed
// Enumerable
Object.defineProperty(person, 'name', {
  enumerable: false
});
console.log(Object.keys(person)); // It will show an empty array
// Configurable
Object.defineProperty(person, 'name', {
  configurable: false
});
delete person.name;
console.log(person); // name property is still there


// Constructor prototypes
Object.getPrototypeOf(myObj);
// The same as myObj.__ptoto__ (parent of myObj)
// Constructor.prototype ()   - and as this

// constructors alse have "prototype" property
function Circle(radius) {
  this.radius = radius;
}
// This is the object that will be used as the parent for objects created by a Circle constructor
Circle.prototype;
const circle = new Circle(1);

let obj = {};
// is the same as
let obj = new Object();
// the same things
obj.__proto__;
Object.prototype; // This is the object that will be used as the prototype for all object created by this constructor

let arr = [];
arr.__proto__;
Array.prototype;

circle.__proto__;
Circle.prototype;


// Prototype vs Instance (Own) members
function Circle(radius) {
  this.radius = radius;
  this.draw = function () {
    console.log('draw');
  }
}
const c1 = new Circle(1);
const c2 = new Circle(1);
// After logging these objects to the console, it will show that circles have their own draw method and radius property
// If we have thousands of circles in the memory, then we will have thousands of copies of draw method

// We need to have a single instance of this methos in the memory
Circle.prototype.draw = function () {
  console.log('draw');
};

// Better solution
function Circle(radius) {
  // Instance members
  this.radius = radius;
}
// Prototype members
Circle.prototype.draw = function () {
  console.log('draw');
};
const c1 = new Circle(1);
const c2 = new Circle(1);
// Every object has "toString" method
// We can override this method. This implementation will be used because it is more accessible
Circle.prototype.toString = function () {
  return 'Circle with radius ' + this.radius;
};

// In both these kind of members we can refference other members
function Circle(radius) {
  // Instance members
  this.radius = radius;
  this.move = function () {
    console.log('move');
  }
}
// Prototype members
Circle.prototype.draw = function () {
  // Calling an instance member
  this.move();
  console.log('draw');
};
const c1 = new Circle(1);
c1.draw();

// Reverse example
function Circle(radius) {
  // Instance members
  this.radius = radius;
  this.move = function () {
    // Refrence a prototype members. JavaScript engine will find this method on the prototype (__proto__)
    this.draw();
    console.log('move');
  }
}
// Prototype members
Circle.prototype.draw = function () {
  console.log('draw');
};
const c1 = new Circle(1);
c1.move();


// Iterating Instance (Own) and Prototype members
function Circle(radius) {
  // Instance members
  this.radius = radius;

  this.move = function () {
    console.log('move');
  }
}
// Creating object before adding a draw prototype method
const c1 = new Circle(1);

// Prototype members
Circle.prototype.draw = function () {
  console.log('draw');
};
c1.draw();
// Only returns Instance members
console.log(Object.keys(c1)); // ["radius", "move"]
// For...in loop returns all members
for (let key in c1)
  console.log(key); // radius, move, draw

c1.hasOwnProperty('radius'); // true
c1.hasOwnProperty('draw'); // false


// Avoid extending the Built-in Objects
Array.prototype.shuffle = function () {
  // ..
};
const array = [];
array.shuffle();
// Don't modify objects you don't own!


// Exercises
// StopWatch
function StopWatch() {
  let startTime, endTime, running, duration = 0;

  Object.defineProperty(this, 'duration', {
    get: function () { return duration; },
    set: function (value) { duration = value; }
  });
  Object.defineProperty(this, 'startTime', {
    get: function () { return startTime; }
  });
  Object.defineProperty(this, 'endTime', {
    get: function () { return endTime; }
  });
  Object.defineProperty(this, 'running', {
    get: function () { return running; }
  });
}

StopWatch.prototype.start = function () {
  if (this.running) {
    throw new Error('StopWatch has already started');
  }
  this.running = true;
  this.startTime = new Date();
};
StopWatch.prototype.stop = function () {
  if (!this.running) {
    throw new Error('StopWatch is not started');
  }

  this.running = false;
  this.endTime = new Date();

  const seconds = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
  this.duration += seconds;
};
StopWatch.prototype.reset = function () {
  this.startTime = null;
  this.endTime = null;
  this.running = false;
  this.duration = 0;
};

const sw = new StopWatch();
sw.duration = 10;
// Somesimes making changes for the code for optimization reasons can end up creating
// many other issues. In this program, we didn't have any performance problems, and we knew that
// we were not going to have (1000) instances of the stopwatch in the memory. So putting all these methods
// on the prototype was a very bad idea to start with. It broke the abstraction principle, and now we're exposing
// this duration property so we can modify it from the outside, so essentially
// this stopwatch object is now useless

// Premature optimization is the root of all devil