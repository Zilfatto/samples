// Modules
// We don't wanna have one gigantic file with thaousadns of lines of code - it's hard to maintain
// We should split our code into multiple files which are called "modelus"
// MODULARITY Benefits:
// 1. Increase MAINTAINABILITY of our application, because our code is better organises
// 2. Get the chance to REUSE one or more of our modules in different parts of our applicatiion (or applications)
// 3. We can ABSTRACT code (we can hide some of the complexity in the module and only expose the essentials)

const _radius = new WeakMap();
class Circle {
  constructor(radius) {
    _radius.set(this, radius);
  }

  draw() {
    console.log('Circle with radius' + _radius.get(this));
  }
}
// It needs to take all the code above out of this file and put it into seperate file (which is called - module)
// And then only expose the Circle class to the outside
const c = new Circle(10);
// Using _radius it is possible to get an access to the private property of the circle object
_radius.get(c);
c.draw();

// No modules in ES5. SO different solutions emerged to solve this problem
// Module formats:
// 1. AMD (Asyncronous module definition) - Browser
// 2. CommonJS - Node.js
// 3. UMD (Universal module defenition) - both Browser and Node.js
// 4. ES6 Modules - JavaScript natively supports a module format


// CommonJS | ES6 Modules
// A basic rule of thumb about modularity
// "Things that are highly related should go together"
// In the kitchen (glasses, plates, spoons, and forks, and so on)
// We do not store our clothes in the kitchen. They belong to our bedroom
// It's called "Cohesion" in software engineering


// ES6 Tooling
// Browser for the Front-end | Node.js for the Back-end
// 1. Transpiler and Bundler
//
// "Babel"
// Transpiler = Translator + Complier (It's a combination of two works)
// Converting Modernd JavaScript code into code that all browsers can understand 
//
// "Webpack"
// Module Bundler is responsible for combining all our JavaScript files into a single file, which we call a "bundle"
// We give all our JS file to Webpack, Webpack will combine them into a single file, it will minify our code by
// getting rid of all the white space and comments and then it will uglify our code which basically means
//it will shorten the name of our identifiers, like classes, functions, object and so on. So this will reduce
// the size of the bundle that we will serve to the client