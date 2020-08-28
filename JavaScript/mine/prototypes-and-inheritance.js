function Person(fisrst, last, age, gender) {
    this.first = first;
    this.last = last;
    this.age = age;
    this.gender = gender;
}
let aunt = new Person('Bridget', 'Lopez', 25, 'female');
Person.prototype.greeting = function () {
    return 'Hi there!';
};

// I can access this new method in 3 ways
aunt.greeting();
aunt.__proto__.greeting();
Person.prototype.greeting();
// it tells that in all ways I am on a prototype object of a constructor function

// Ways to get an access to up level constructor
// via which a given object was created
aunt.constructor;
aunt.__proto__.constructor;
Object.getPrototypeOf(aunt).constructor;
Person;

// to the prototype
aunt.__proto__;
Object.getPrototypeOf(aunt);
Person.prototype;

// Moreover, constructor function prorotype property has a pointer to its constructor
Person.prototype.constructor.prototype.constructor...
// it creates a cycle
// One more evidence to it
aunt.__proto__.constructor.name;
Person.prototype.constructor.name;
Person.name;
// All these approuches return the same name - "Person"

// Basically, Person function itself is a constructor that has a prototype property,
// inside which it is possible to add methods
// Because printing Person and Person.prototype.constructor will spit out the same thing
// Else, next things are the same
let someGuy = new Person('hisname', 'hislastname', 55, 'gender');
let oneMoreGuy = new Person('hisname', 'hislast', 333, 'gender');

// Two chains
// This will give a Person prototype
aunt.__proto__;
Person.prototype;
// But this will give a root prototype for Person prototype
aunt.__proto__.__proto__;
Person.prototype.__proto__;
// This will give a constructor function
aunt.__proto__.constructor;
// Or
aunt.constructor;
// The prototype of this function is
aunt.__proto__.constructor.__proto__; // a function prototype
// The constructor function "Function()" via which Person was created
aunt.__proto__.constructor.__proto__.constructor;
// The root Object prototype of a fucntion prototype
aunt.__proto__.constructor.__proto__.__proto__;
// The root constructor function itsekf "Object()"
Person.__proto__.__proto__.constructor;


// My insight
// __proto__ shows real prototypal chain whereby (object) instance can use
// all the methods defined there. Prototype does not have its own prototype (__proto__),
// if so there will be an infinite chain, because Object.prototype has to have its prototype (__proto__) as well.
// Prototypal chain (__proto__.__proto__ ...) shows prototypes on defferent levels from which methods are inherited
// and each prototype is like a sheet of paper on which ti write inheritable methods

// Just object created by object literals. It can access only methods from Object.prototype
const obj = {};
obj.__proto__; // and this protytype does not have its own parent prototype - (__proto__) property
// or
Object.prototype; // it is a root prototype via which other objects will be created
// Just array created by array literals.
const arr = [];
arr.__proto__; // at this prototype (level) it can access methods defined on Array.prototype
arr.__proto__.__proto__; // at this one it can access methods defined on Object.prototype

arr.__proto__.__proto__.__proto__; // will show a null

// If to go this way. Object constructor function itself was created via Function constructor function
// (but creating Object, Function, Array and ither constructor function is quite complicated)
// and inherits its methods from Function.prototype
obj.__proto__.constructor.__proto__;
// or
Object.__proto__;
// or
Function.prototype;

// The important thing is that prototypal chain is absolutely correct
obj.__proto__.constructor.__proto__; // at this level Object function inherits methods from Function.prototype
obj.__proto__.constructor.__proto__.__proto__; // and at this one it inherits methods from Object.prototype
// and obj inherits only methods defined on Object.prototype
obj.__proto__;

// There is a bug
Function.__proto__;
// and
Function.prototype;
// Because they show the same thing
// Orrrr may be it tells that Function constructor function has no parent constructor function

// But when any function is created via Function constructor it inherits its prototype and Object prototype
// because
Function.prototype.__proto__; // points to the Object.prototype


// One more time
// Object is the root object
// Because Object.prototype does not have any __proto__ to inherit from
function smth() { }; // smth.__proto__ will point to Function.prototype, which in its turn has __proto__ property
// pointing to Object.prototype (root object)

// But if to go through the constructors, then the root of all is Function()
// which has no parent constructor functions. (and Object() was also created via Function)

// 1. At first there is a Function constructor function, it has __proto__ and prototype which are equal (or more accurate __proto__ points to prototype) because Function is the source
// 2. Then create Object based on Function() constructor, its __proto__ points to the Function.prototype and it's correct (it's done in order Object() to inherit methods from parent Function)
// 3. But for prototypal inheritance Object.prototype has no parents (__proto__). It is becoming a root of the inheritance chain
// 4. Then Function.prototype.__proto__ and Function.__proto__.__proto__ make to point to the Object.prototype

// So, when new function is created it inherits methods from Function.prototype and also from Object.prototype
function myFunc() { };
// When {} object is created it inherits only from Object.prototype
// So, my own constructor function inherits methods from Function.prototype and Object.prototype
function smth(name) {
    this.name = name;
}
smth.prototype.greeting = function () {
    alert('Hello');
};
// But when object instance is created, what is happening?
// First, "new" keyword creates empty object {}
// Then all properties defined on constructor are copied to this empty object
// myInstance.__proto__ points to the smth.prototype in order to inherit its methods defined there
// Finally, the chail lokks like: myInstance.__proto__ -> smth.prototype -> Object.prototype
const myInstance = new smth('Dave');


let obj = {};
// Under the hood is the same as
let obj = new Object();

// So, "new" keyword creates an empty object {}, whick __proto__ property will point to the Object.prototype
// It invite the assumption that {} object is common container for all data
// This is why all "prototypes" themselves are object by the structure and do not have their parent prototypes
// Prototypes object are used only for creating prototypal chains