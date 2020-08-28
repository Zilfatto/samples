// Creating my own prototypical inheritance
// Resetting the constructor
function Shape() {
}
Shape.prototype.duplicate = function () {
  console.log('duplicate');
}

function Circle(radius) {
  this.radius = radius;
}

// Initial state. Circle.prototype was like this, which inherits from objectBase
Circle.prototype = Object.create(Object.prototype);

// This statement creates new object that inherits from Shape.prototype and reset Circle.prototype to it
Circle.prototype = Object.create(Shape.prototype);
// Circle.prototype.constructor = Circle;
// new Cirlce.prototype.constructor() => new Cirlce();
// So, as the best practice after resetting the prototype, it needs to reset a constructor. There are two ways:
Circle.prototype.constructor = Circle;
// Or using defineProperty
Object.defineProperty(Circle.prototype, 'constructor', {
  value: Circle,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true
});

// These two steps are leading to the same result as this
Circle.prototype.__proto__ = Shape.prototype;

Circle.prototype.draw = function () {
  console.log('draw');
}

const s = new Shape();
const c = new Circle(1);


// Calling the Super constructor
function Shape(color) {
  this.color = color;
}
Shape.prototype.duplicate = function () {
  console.log('duplicate');
}

function Circle(radius, color) {
  // If use just Shape(color); That color will be defined on the window object
  // The Super constructor
  Shape.call(this, color);
  this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function () {
  console.log('draw');
}

const s = new Shape();
const c = new Circle(1, 'red');


// Intermediate function inheritance
function Square(size) {
  this.size = size;
}
// These lines for setting up prototypal chain a little bit noisy
// For defining multiple object it gets in the way
Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;
// In a better way
extend(Square, Shape);
// refactoring this code. This function is called Intermediate function inheritance
function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}


// Method overriding (redefining)
function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}
function Shape() {
}
// This method works for most of the shape objects, but we need it to behave differently for Circle objects
Shape.prototype.duplicate = function () {
  console.log('duplicate');
}
function Circle() {
}
// Resetting the prototype
extend(Circle, Shape);
// Redefining this method on Circle.prototype. Only after extending !!!
Circle.prototype.duplicate = function () {
  // Using parent implementation as well
  Shape.prototype.duplicate.call(this);

  console.log('duplicate circle');
}
const c = new Circle();


// Polymorphism
function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}
function Shape() {
}

Shape.prototype.duplicate = function () {
  console.log('duplicate');
}
// Now we have a simple hierarchy, on the top - Shape, derivatives - Circle and Square
// Each object will provide a different implementation of the duplicate method
// Many forms of the implementations is called polymorphism
function Circle() {
}
// Resetting the prototype
extend(Circle, Shape);
Circle.prototype.duplicate = function () {
  console.log('duplicate circle');
}

function Square() {
}
extend(Square, Shape);
Square.prototype.duplicate = function () {
  console.log('duplicate square');
}
// Powerful of polymorphism
const shapes = [
  new Circle(),
  new Square()
];
// Depending on the type of the shape object a different form of a duplicate() method will be called
for (let shape of shapes)
  shape.duplicate();

// Before OOP we would end up with that
for (let shape of shapes) {
  if (shape.type === 'circle')
    duplicateCircle();
  else if (shape.type === 'square')
    duplicateSquare();
  else
    duplicateShape();
  // If we had 10 different types of shapes, we would end up with 11 conditional statements
  // Because each shape needs related function
}


// when to use Inheritance
// 1. Avoid creating inheritance hierarchies (do not go than 1 level of inheritance)
// 2. Favour Composition over Inheritance

// Inheritance
//           Animal object (eat(), walk())
//   Person                          Dog
// If we want to create a Goldfish object it cannot inherits eat() method, so solution is this:
//        
//                   Animal object (eat())
//     Mammal object (walk())     Fish object (swim())
//  Person             Dog                   Goldfish

// It creates hierarchies, that is bad for maintaining and if we will have 10 different animals we end up with a lot of Constructors
// Solution is Composition (via Mixins)
// We have 3 independent objects

//    canWalk           canEat               canSwim
//  Person will use - canWalk | canEat,  Golfish will use - canEat | canSwim



// Mixins
// Last step. Making this code a bit more readable
function mixin(target, ...sources) {
  Object.assign(target, ...sources);
}
// Sources
const canEat = {
  eat: function () {
    this.hunger--;
    console.log('eating');
  }
};

const canWalk = {
  walk: function () {
    console.log('walking');
  }
};
// Adding new objects dog, goldfish in this application
const canSwim = {
  swim: function () {
    console.log('swim');
  }
};
// Creating new object
const person = Object.assign({}, canEat, canWalk);
console.log(person);
// For constructor functions
function Person() {
}
mixin(Person.prototype, canEat, canWalk);
const person1 = new Person();
console.log(person1);

function GoldFish() {
}
mixin(GoldFish.prototype, canEat, canSwim);
const goldFish = new GoldFish();
console.log(goldFish);


// Exercise - Prototypical inheritance
function HtmlElement() {
  this.click = function () {
    console.log('clicked');
  };
}
HtmlElement.prototype.focus = function () {
  console.log('focused');
};

function HtmlSelectElement(items = []) {
  this.items = items;
  this.addItem = function (item) {
    this.items.push(item);
  }
  this.removeItem = function (item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
// First way
HtmlSelectElement.prototype = Object.create(HtmlElement.prototype);
HtmlElement.call(HtmlSelectElement.prototype);
// Second way
HtmlSelectElement.prototype = new HtmlElement();
// Required statement
HtmlSelectElement.prototype.constructor = HtmlSelectElement;


// Exercise - Polymorphism
function HtmlElement() {
  this.click = function () {
    console.log('clicked');
  };
}
HtmlElement.prototype.focus = function () {
  console.log('focused');
};

function HtmlSelectElement(items = []) {
  this.items = items;
  this.render = function () {
    return `
<select>${this.items.map((item) => `
    <option>${item}</option>`).join('')}
</select>`;

    // let options = '';
    // this.items.forEach((item) => {
    //   options += `\t<option>${item}</option>\n`;
    // });
    // return `<select>\n${options}</select>`;
  }
  this.addItem = function (item) {
    this.items.push(item);
  }
  this.removeItem = function (item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlSelectElement;

function HtmlImageElement(src) {
  this.src = src;
  this.render = function () {
    return `<img src="${this.src}" />`;
  }
}
HtmlImageElement.prototype = new HtmlElement();
HtmlImageElement.prototype.constructor = HtmlImageElement;

const elements = [
  new HtmlSelectElement([1, 2, 3]),
  new HtmlImageElement('http://')
];

for (let element of elements)
  console.log(element.render());