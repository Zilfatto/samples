let f = function() {
    this.a = 1;
    this.b = 2;
}
let o = new f(); // {a: 1, b: 2}
// add properties in f function's prototype
f.prototype.b = 3;
f.prototype.c = 4;
// do not set the prototype f.prototype = {b:3,c:4}; this will break the prototype chain
// o.[[Prototype]] has properties b and c.
// o.[[Prototype]].[[Prototype]] is Object.prototype.
// Finally, o.[[Prototype]].[[Prototype]].[[Prototype]] is null.
// This is the end of the prototype chain, as null,
// by definition, has no [[Prototype]].
// Thus, the full prototype chain looks like:
// {a: 1, b: 2} ---> {b: 3, c: 4} ---> Object.prototype ---> null

console.log(o.a); // 1
// Is there an 'a' own property on o? Yes, and its value is 1.
console.log(o.b); // 2
// Is there a 'b' own property on o? Yes, and its value is 2.
// The prototype also has a 'b' property, but it's not visited. 
// This is called Property Shadowing
console.log(o.c); // 4
// Is there a 'c' own property on o? No, check its prototype.
// Is there a 'c' own property on o.[[Prototype]]? Yes, its value is 4.
console.log(o.d); // undefined
// Is there a 'd' own property on o? No, check its prototype.
// Is there a 'd' own property on o.[[Prototype]]? No, check its prototype.
// o.[[Prototype]].[[Prototype]] is Object.prototype and there is no 'd' property by default, check its prototype.
// o.[[Prototype]].[[Prototype]].[[Prototype]] is null, stop searching,
// no property found, return undefined.


// INheriting "methods"
let o = {
    a: 2,
    m: function() {
        return this.a + 1;
    }
};
console.log(o.m()); // 3
// When calling o.m in this case, 'this' refers to o
let p = Object.create(o);
// p is an object that inherits from o
p.a = 4; // creates a property 'a' on p
console.log(p.m()); // 5
// when p.m is called, 'this' refers to p.
// So when p inherits the function m of o, 
// 'this.a' means p.a, the property 'a' of p


// Using prototypes in JavaScript
function doSomething() {}
// Or
let doSomethingElse = function() {};
console.log(doSomething.prototype);
//  It does not matter how you declare the function, a
//  function in JavaScript will always have a default
//  prototype property.
//  (Ps: There is one exception that arrow function doesn't have a default prototype property)
let doSome = () => {}; // Does not have a prototype property

// function prototype looks something loke this
{
    constructor: ƒ doSomething(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
    }
}

// We can add properties to the prototype of doSomething(), as shown below.
doSomething.prototype.foo = 'bar';
console.log(doSomething.prototype);
// The result is
{
    foo: 'bar',
    constructor: ƒ doSomething(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
    }
}

// We can now use the new operator to create an instance of doSomething() based on this prototype
let doSomeInstancing = new doSomething();
doSomeInstancing.prop = 'some value'; // add a property onto the object
console.log(doSomeInstancing);
// The result in an output similar to the following
{
    prop: 'some value',
    __proto__: {
        foo: 'bar',
        constructor: ƒ doSomething(),
        __proto__: {
            constructor: ƒ Object(),
            hasOwnProperty: ƒ hasOwnProperty(),
            isPrototypeOf: ƒ isPrototypeOf(),
            propertyIsEnumerable: ƒ propertyIsEnumerable(),
            toLocaleString: ƒ toLocaleString(),
            toString: ƒ toString(),
            valueOf: ƒ valueOf()
        }
    }
}
// Enter some more code into the console
console.log("doSomeInstancing.prop:      " + doSomeInstancing.prop);
console.log("doSomeInstancing.foo:       " + doSomeInstancing.foo);
console.log("doSomething.prop:           " + doSomething.prop);
console.log("doSomething.foo:            " + doSomething.foo);
console.log("doSomething.prototype.prop: " + doSomething.prototype.prop);
console.log("doSomething.prototype.foo:  " + doSomething.prototype.foo);
// The result in the following
doSomeInstancing.prop:      some value
doSomeInstancing.foo:       bar
doSomething.prop:           undefined
doSomething.foo:            undefined
doSomething.prototype.prop: undefined
doSomething.prototype.foo:  bar


// Different ways to create objects and the resulting prototype chain


// Objects created with syntax constructors
let o = {a: 1};
// The newly created object o has Object.prototype as its [[Prototype]]
// o has no own property named 'hasOwnProperty'
// hasOwnProperty is an own property of Object.prototype. 
// So o inherits hasOwnProperty from Object.prototype
// Object.prototype has null as its prototype.
// o ---> Object.prototype ---> null
let b = ['yo', 'whadup', '?'];
// Arrays inherit from Array.prototype 
// (which has methods indexOf, forEach, etc.)
// The prototype chain looks like:
// b ---> Array.prototype ---> Object.prototype ---> null
function f() {
    return 2;
}
// Functions inherit from Function.prototype 
// (which has methods call, bind, etc.)
// f ---> Function.prototype ---> Object.prototype ---> null


// With a constructor
function Graph() {
    this.vertices = [];
    this.edges = [];
}
Graph.prototype = {
    AddVertex: function(v) {
        this.vertices.push(v);
    }
};
let g = new Graph();
// g is an object with own properties 'vertices' and 'edges'.
// g.[[Prototype]] is the value of Graph.prototype when new Graph() is executed.


// With Object.create
// The prototype of this object is the first argument of the function
let a = {a: 1};
// a ---> Object.prototype ---> null
let b = Object.create(a);
// b ---> a ---> Object.prototype --->
console.log(b.a); // 1 (inherited)
let c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null
let d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty);
// undefined, because d does not inherit from Object.prototype


// delete Operator with Object.create and new operator
let a = {a: 1};
let b = Object.create(a);
console.log(a.a); // 1
console.log(b.a); // 1
b.a = 5;
console.log(a.a); // 1
console.log(b.a); // 5
delete b.a;
console.log(a.a); // 1
console.log(b.a); // 1 (b.a value 5 is deleted but it showing value from its prototype chain)
delete a.a;
console.log(a.a); // undefined
console.log(b.a); // undefined

// The new operator has a shorter chain in this example:
function Graph() {
    this.vertices = [4,4];
}
let g = new Graph();
console.log(g.vertices); // [4,4]
g.vertices = 25;
console.log(g.vertices); // 25
delete g.vertices;
console.log(g.vertices); // undefined


// With the class keyword
'use strict'
class Polygon {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}
class Square extends Polygon {
    constructor(sideLength) {
        super(sideLength, sideLength);
    }
    get area() {
        return this.height * this.width;
    }
    set sideLength(newLength) {
        this.height = newLength;
        this.width = newLength;
    }
}
let square = new Square(2);


// Perfomance
// The lookup time for properties that are high up on the prototype chain can have
// a negative impact on the performance, and this may be significant in the code
// where performance is critical. Additionally, trying to access nonexistent properties
// will always traverse the full prototype chain.

// Also, when iterating over the properties of an object, every enumerable property that is on
// the prototype chain will be enumerated. To check whether an object has a property defined on
// itself and not somewhere on its prototype chain, it is necessary to use the hasOwnProperty method
// which all objects inherit from Object.prototype. To give you a concrete example, let's take
// the above graph example code to illustrate it:
console.log(g.hasOwnProperty('vertices'));
// true
console.log(g.hasOwnProperty('nope'));
// false
console.log(g.hasOwnProperty('addVertex'));
// false
console.log(g.__proto__.hasOwnProperty('addVertex'));
// true
// hasOwnProperty is the only thing in JavaScript which deals with properties and does not traverse the prototype chain.




// Bad practice: Extension of native prototypes

// One misfeature that is often used is to extend Object.prototype or one of the other built-in prototypes.

// This technique is called monkey patching and breaks encapsulation. While used by popular frameworks such as Prototype.js,
// there is still no good reason for cluttering built-in types with additional non-standard functionality.

// The only good reason for extending a built-in prototype is to backport the features of newer JavaScript engines, like Array.forEach.