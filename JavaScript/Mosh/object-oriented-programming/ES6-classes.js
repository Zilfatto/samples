// Before
function Circle(radius) {
  this.radius = radius;
  this.draw = function () {
    console.log('draw');
  }
}
// ES6 classes 
class Circle {
  constructor(radius) {
    this.radius = radius;
    // Method on the object instance
    this.move = function () {
      console.log('move');
    }
  }
  // Method on the prototype
  draw() {
    console.log('draw');
  }
}
const c = new Circle(1);
typeof Circle; // this class is a "function" - constructor function


// Hoisting

// Different ways of defining dunction
sayHello(); // Calling before declaration
// Function Declaration
function sayHello() { }
// Function Expression
const sayGoodby = function () { };
// Expression are not hoisted
sayGoodby();
// Class declaration
class Circle {
}
// Class expression
const Square = class {
};
// Class declaration and expression are not hoisted. It is better to stick to class Declarations
const c = new Circle();


// Static methods
// In classic OOP languages we have Instance and Static methods 
class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  // Instance method (because it's available on an instance of a class which is an object)
  draw() {
    console.log('draw');
  }

  // Static method (available on a class itself, not tied to a particular circle object ). Used to create utility functions not specific to a given object
  static parse(str) {
    // Parsing JSON and return new circle object
    const radius = JSON.parse(str).radius;
    return new Circle(radius);
  }
}
const circle = Circle.parse('{ "radius": 1 }');
console.log(circle);

// Anpther example
// Math object has a bunch of different methods available on it. We are not newing up a new object by "new Math();""
// If this object did not exist in JS we would wont to implement it
class Math2 {
  static abs(value) {
    // ...
  }
}
Math2.abs(4);


// The "this" keyword
const Circle = function () {
  this.draw = function () { console.log(this); }
};
const c = new Circle();
// Method call
c.draw(); // Circle object
// Getting a reference to that method
const draw = c.draw;
console.log(draw); // anonymous function
// Function call
draw(); // Window object. In 'strict mode' it returns "undefined"

// By default. Because the body of our classes are executed in a strict mode
class Circle {
  draw() {
    console.log(this);
  }
}
const c = new Circle();
const draw = c.draw;
draw(); // undefined


// Private members using symbols
// Common class
class Circle {
  constructor(radius) {
    this.radius = radius;
  }
}
const c = new Circle(1);
c.radius;

// Three approuches

// First one is terrible, because it is accessible from the outside
class Circle {
  constructor(radius) {
    this._radius = radius;
  }
}
const c = new Circle(1);
c._radius;

// Using ES6 Symbols. Use unique value as a property name of an object
const _radius = Symbol(); // Symbol() function generates unique identifier
Symbol() === Symbol(); // false

class Circle {
  constructor(radius) {
    // Common assigning
    // this.radius = radius;
    // this.['raidus'] = radius;
    // Via Symbol's unique value. It is kind of private property
    this[_radius] = radius;
  }
}
const c = new Circle(1);
console.log(c); // Symbol(): 1 - will be as a property. This is how we see internally the name of a property as a unique value
// We cannon get direct access to that
c.radius; // No such property
c._radius; // No such property
console.log(Object.getOwnPropertyNames(c)); // Empty array
console.log(Object.getOwnPropertySymbols(c)); // [Symbol()]
// Just for the demonstration
const key = Object.getOwnPropertySymbols(c)[0];
console.log(c[key]); // 1

// Private method
const _radius = Symbol();
const _draw = Symbol();
class Circle {
  constructor(radius) {
    this[_radius] = radius;
  }
  // In ES6 there is a new feature called - Computed property name using []
  // Inside of brackets we add an expression, after evaluating it,
  // the resulting value will be used as the name of the property or method  
  [_draw]() {
    console.log('draw');
  }
}
const c = new Circle(1);

// Private members using WeakMaps
// Defining this at the top to indicate that it is a private property
// WeakMap - where Keys are Object and Values can be anythig
// Keys are weak, if there is no any references to these key they will be garbage collected
const _radius = new WeakMap();
class Circle {
  constructor(radius) {
    // "this" represents the instance of a circle object
    // Technically we can access this radius private property if we can get access to _radius WeakMap
    // But using Modules, we can hide this _radius in a module and only export the Circle class
    _radius.set(this, radius);
  }
  // Accessing this property inside of this class
  draw() {
    console.log(_radius.get(this)); // 1
  }
}
const c = new Circle(1); // does not have "radius" property

// defining private method
const _radius = new WeakMap();
const _move = new WeakMap();
class Circle {
  constructor(radius) {
    _radius.set(this, radius);

    _move.set(this, function () {
      console.log('move', this); // "this" is undefined
    });
    // To solve the problem with "this"
    _move.set(this, () => {
      console.log('move', this); // "this" is Circle instance
    });
  }

  draw() {
    _move.get(this);
    console.log('draw');
  }
}
const c = new Circle(1);

// Not prefered way, but using WeakMap for all properties and methods
const privateProps = new WeakMap();
class Circle {
  constructor(radius) {
    // This syntax is a little bit polluted
    // Prefered to use these props independently
    privateProps.set(this, {
      radius: radius,
      move: () => {
        console.log('move');
      }
    });
  }

  draw() {
    // Accessing from the single WeakMap 
    privateProps.get(this).move();
    console.log('draw');
  }
}
const c = new Circle(1);


// Getters and Setters
const _radius = new WeakMap();
class Circle {
  constructor(radius) {
    _radius.set(this, radius);
    // Old way of setting a getter. Getting a value like a property. This syntax is very convoluted
    Object.defineProperty(this, 'radius', {
      get: function () {
        return _radius.get(this);
      }
    });
  }
  // Method for getting a value of a private property from the outside
  getRadius() {
    return _radius.get(this);
  }
}
const c = new Circle(1);
// New way
const _radius = new WeakMap();
class Circle {
  constructor(radius) {
    _radius.set(this, radius);
  }
  // New way of defining a getter
  get radius() {
    return _radius.get(this);
  }
  // Setter can be defined in the same way
  set radius(value) {
    if (value <= 0) throw new Error('Invalid radius');
    _radius.set(this, value);
  }
}
const c = new Circle(1);


// Inheritance
class Shape {
  constructor(color) {
    this.color = color;
  }

  move() {
    console.log('move');
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }
  draw() {
    console.log('draw');
  }
}
const c = new Circle('red', 1);
c.move();
c.draw();
c.radius;


// Method overriding
class Shape {
  move() {
    console.log('move');
  }
}
class Circle extends Shape {
  move() {
    console.log('circle move');
  }
}
const c = new Circle();

// If we need to reuse some of the code implemented in the parent
class Shape {
  move() {
    console.log('move');
  }
}
class Circle extends Shape {
  move() {
    super.move();
    console.log('circle move');
  }
}
const c = new Circle();
c.move(); // move
//           circle move


// Exercise
const _items = new WeakMap();
class Stack {
  constructor() {
    _items.set(this, []);
  }

  push(item) {
    _items.get(this).push(item);
  }

  pop() {
    const items = _items.get(this);
    if (items.length === 0)
      throw new Error('Stack is empty');
    return items.pop();
  }

  peek() {
    const items = _items.get(this);
    const itemsNumber = items.length;
    if (itemsNumber === 0)
      throw new Error('Stack is empty');
    return items[itemsNumber - 1];
  }

  get count() {
    return _items.get(this).length;
  }
}