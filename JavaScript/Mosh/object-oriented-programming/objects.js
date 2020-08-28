// Encapsulation
let baseSalary = 30_000;
let overtime = 10;
let rate = 20;

function getWage(baseSalary, overtime, rate) {
    return baseSalary + (overtime * rate);
}
// OOP way
let employee = {
    baseSalary: 30_000,
    overtime: 10,
    rate: 20,
    getWage: function () {
        return this.baseSalary + (this.overtime * this.rate);
    }
}
employee.getWage();
// "The best functions are those with no parameters"



// Object literals
const circle = {
    radius: 1,
    location: {
        x: 1,
        y: 1
    },
    draw: function () {
        console.log('draw');
    }
};


// Factories
function createCircle(radius) {
    return {
        radius,
        draw: function () {
            console.log('draw');
        }
    };
}
const circle = createCircle(1);


// Constructor function
function Circle(radius) {
    this.radius = radius;
    this.draw = function () {
        console.log('draw');
    };
}
const another = new Circle(1);
// what happens under the hood
// new keyword creates an empty object {}
// then it will set this keyword in Circle to point to that empty object and automatically return that object from Circle function
// Otherwise, without "new" this will point to the global object - window


// Constructor property
let x = {};
x.constructor; // will return its function that was used when creating object
// Using object literal syntax
// under the hood translating to - - - let x = new Object();
new String(); // literals: '', "", or ``
new Boolean(); // true, false
new Number(); // 1, 2, 3, ...


// Functions are object
Circle.constructor;
// Returns Function() built-in constructor who created this funciton
// what's happening internally
const Circle1 = new Function('radius', `
this.radius = radius;
this.draw = function() {
    console.log('draw');
};
`);
const circleAn = new Circle1(1);
// Couple of methods available in our functions
// this is the same as on the line 55
Circle.call({}, 1);
Circle.apply({}, [1, 2, 3]);
// and this
Circle.call(window, 1);
// is the same as
let something = Circle(1);


// Value types vs Reference types
// First
Number,
    String,
    Boolean,
    Symbol,
    undefined,
    null
// Reference
Object,
    Function,
    Array
// Difference
let x = 10;
let y = x;
x = 20;
// x = 20, y = 10  -  they are independent
let one = { value: 10 };
let two = one;
one.value = 20;
// Both one and two have 20 in value property. Copying address

let number = 10;
// function copies the number. It is independent
function increase(number) {
    number++;
}
increase(number);
console.log(number); // 10


let obj = { value: 10 };
function increase(obj) {
    obj.value++;
}
increase(obj);
console.log(obj);
// Tese ones are dependent


// Adding or Removing properties
function Circle(radius) {
    this.radius = radius;
    this.draw = function () {
        console.log('draw');
    };
}
const circle = new Circle(1);
circle.location = { x: 1 };
// in cases if property with not a valid identifier
const = propertyName = 'location-smth';
circle[propertyName] = { x: 1 };
delete circle.location;
delete circle['location'];


// Enumerating property
for (let key in circle) {
    console.log(key); // keys
    console.log(key, circle[key]); // values
}
for (let key in circle) {
    // only for properties
    if (typeof circle[key] !== 'function') {
        console.log(key, circle[key]);
    }
}
// Or (here we cannot seperate peroperties from methods)
const keys = Object.keys(circle);
console.log(keys);
// If an object has a given property or method
if ('radius' in circle) {
    console.log('Circle has a radius.');
}


// Abstraction
// Not all members should be accessible to the consumor of this object
// version 1
function Circle(radius) {
    this.radius = radius;
    this.defaultLocation = { x: 0, y: 0 };
    this.computeOptimumLocation = function () {
        /// ...
    };
    this.draw = function () {
        this.computeOptimumLocation();

        console.log('draw');
    };
}
const circle = new Circle(10);
circle.computeOptimumLocation();

// version 2
// there is a need to modify function everywhere
function Circle(radius) {
    this.radius = radius;
    this.defaultLocation = { x: 0, y: 0 };
    this.computeOptimumLocation = function (factor) {
        /// ...
    };
    this.draw = function () {
        this.computeOptimumLocation();

        console.log('draw');
    };
}
const circle = new Circle(10);
circle.computeOptimumLocation('value');



// Private properties and methods
function Circle(radius) {
    this.radius = radius;
    let defaultLocation = { x: 0, y: 0 };
    let computeOptimumLocation = function (factor) {
        /// ...
    };
    this.draw = function () {
        computeOptimumLocation(0.1);
        // defaultLOcation
        // this.radius
        console.log('draw');
    };
}
// More accurately, these memebers with "let" are not private members
// Because technically, they are not inside of this Circle object. They are local variables


// Getter
function Circle(radius) {
    this.radius = radius;
    let defaultLocation = { x: 0, y: 0 };
    this.draw = function () {
        console.log('draw');
    };
    Object.defineProperty(this, 'defaultLocation', {
        get: function () {
            return defaultLocation;
        }
    });
}
const circle = new Circle(10);
// Read only property
circle.defaultLocation;
circle.draw();


// Setter
function Circle(radius) {
    this.radius = radius;
    let defaultLocation = { x: 0, y: 0 };
    this.draw = function () {
        console.log('draw');
    };
    Object.defineProperty(this, 'defaultLocation', {
        get: function () {
            return defaultLocation;
        },
        // Validate before setting a new value
        set: function (value) {
            if (!value.x || !value.y) {
                throw new Error('Invalid location.');
            }
            defaultLocation = value;
        }
    });
}
const circle = new Circle(10);
circle.defaultLocation = 'new value';
circle.draw();



// StopWatch exercise
function StopWatch() {
    let startTime, endTime, running, duration = 0;
    this.start = function () {
        if (running) {
            throw new Error('StopWatch has already started');
        }

        running = true;
        startTime = new Date();
    };
    this.stop = function () {
        if (!running) {
            throw new Error('StopWatch is not started');
        }

        running = false;
        endTime = new Date();

        const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
        duration += seconds;
    };
    this.reset = function () {
        startTime = null;
        endTime = null;
        running = false;
        duration = 0;
    };
    Object.defineProperty(this, 'duration', {
        get: function () { return duration; }
    });
}