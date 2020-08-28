""" SPREAD SYNTAX (...) """

function sum(x, y, z) {
    return x + y + z;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers)); // expected output: 8
console.log(sum.call(null, ...numbers)); // the same
console.log(sum.apply(null, numbers)); // the same

// Using elements of an array as aruments
function myFunction(x, y, z) { return x * y * z; }
const args = [0, 1, 2];
myFunction.apply(null, args);
myFunction(...args);
myFunction(-1, ...args, 2, ...[3]);


const dateFields = [1970, 0, 1]; // 1 Jan 1970
const d = new Date(...dateFields);

function applyAndNew(constructor, args) {
    function partial() {
        return constructor.apply(this, args);
    };
    if (typeof conatructor.prototype === 'object') {
        partial.prototype = Object.create(constructor.prototype);
    }
    return partial;
}

function myConstructor() {
    console.log('arguments.length: ' + arguments.length);
    console.log(arguments);
    this.prop1 = 'val1';
    this.prop2 = 'val2';
}

const myArguments = ['hi', 'how', 'are', 'you', 'mr', null];
const myConstructorWithArguments = applyAndNew(myConstructor, myArguments);

console.log(new myConstructorWithArguments);
// (internal log of myConstructor);             arguments.length: 6
// (internal log of myConstructor);             ['hi', 'how', 'are', 'you', 'mr', null];
// (log of "new myConstructorWithArguments"):   {prop1: "val10", prop2: "val2"}


const parts = ['shoulders', 'knees'];
const lyrics = ['head', ...parts, 'and', 'toes'];
// ["head", "shoulders", "knees", "and", "toes"]

const arr = [1, 2, 3];
const arr2 = [...arr]; // like arr.slice()

arr2.push(4);
// arr2 becomes [1, 2, 3, 4]
// arr remains unaffected

// Spread syntax effectively goes one level deep while copying an array.
// Therefore, it may be unsuitable for copying multidimensional arrays,
// as the following example shows. (The same is true with Object.assign()
// and spread syntax.)
const a = [[1], [2], [3]];
const b = [...a];
const c = [...a];
b.shift().shift(); // 1
console.log(`${a}`); // [[], [2], [3]]
// Any changes to b or c affect a array

const arr1 = [0, 1, 2];
const arr2 = [3, 4, 5];

// Append all items from arr2 to arr 1
arr1 = arr1.concat(arr2);
arr1 = [...arr1, ...arr2];
//  arr1 is now [0, 1, 2, 3, 4, 5]
// Note: Not to use const otherwise, it will give TypeError (invalid assignment) 

// Prepend all items from arr2 onto arr1
Array.prototype.unshift.apply(arr1, arr2);
arr1 = [...arr2, ...arr1];
//  arr1 is now [3, 4, 5, 0, 1, 2]
// Unlike unshift(), this creates a new arr1, and does not modify the original arr1 array in-place

// Shallow-cloning (excluding prototype) or merging of objects is now possible using a shorter syntax than Object.assign().
const obj1 = { foo: 'bar', x: 42 };
const obj2 = { foo: 'baz', y: 12 };
const cloneObj = { ...obj1 };
// Object { foo: "bar", x: 42 }
const mergeObj = { ...obj1, ...obj2 };
// Object { foo: "baz", x: 42, y: 13 }
// Note that Object.assign() triggers setters, whereas spread syntax doesn't.

// Note that you cannot replace or mimic the Object.assign() function:
let obj1 = { foo: 'bar', x: 42 };
let obj2 = { foo: 'baz', y: 13 };
const merge = ( ...objects ) => ( { ...objects } );
let mergeObj1 = merge (obj1, obj2);
// Object { 0: { foo: 'bar', x: 42 }, 1: { foo: 'baz', y: 13 } }
let mergeObj2 = merge ({}, obj1, obj2);
// Object { 0: {}, 1: { foo: 'bar', x: 42 }, 2: { foo: 'baz', y: 13 } }
// In the above example, the spread syntax does not work as one might expect:
// it spreads an array of arguments into the object literal, due to the rest parameter.


const obj = {'key1': 'value1'};
const array = [...obj]; // TypeError: obj is not iterable




""" REST PARAMETERS """

function sum(...theArgs) {
    return theArgs.reduce((previous, current) => {
        return previous + current;
    })
}
console.log(sum(1, 2, 3)); // Expected output: 6
console.log(sum(1, 2, 3, 4)); // Expected output 10

function myFun(a, b, ...manyMoreArgs) {
    console.log('a', a);
    console.log('b', b);
    console.log('manyMoreArgs', manyMoreArgs);
}
myFun('one', 'two', 'three', 'four', 'five', 'six');
// Output
// a, one
// b, two
// manyMoreArgs, [three, four, five, six]
myFun('one', 'two', 'three');
// a, one
// b, two
// manyMoreArgs, [three]
myFun('one', 'two');
// manyMoreArgs, []


// Before rest parameters, "arguments" could be converted to a normal array using:
function f(a, b) {
    let normalArray = Array.prototype.slice.call(arguments);
    // -- or --
    let normalArray = [].slice.call(arguments);
    // -- or --
    let normalArray = Array.from(arguments);

    let first = normalArray.shift(); // OK, gives the first argument
    let first = arguments.shift(); // ERROR (arguments is not a normal array)
}
// Now, you can easily gain access to a normal array using a rest parameter
function f(...args) {
    let normalArray = args;
    let first = normalArray.shift(); // OK, gives the first argument
}


function fun1(...theArgs) {
    console.log(theArgs.length);
}
fun1(); // 0
fun1(5); // 1
fun1(5, 6, 7); // 3


function multiply(multiplier, ...theArgs) {
    return theArgs.map(element => {
        return multiplier * element;
    });
}
let arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]


function sortRestArgs(...theArgs) {
    let sortedArgs = theArgs.sort();
    return sortedArgs;
}
console.log(sortRestArgs(5, 3, 7, 1)); // 1, 3, 5, 7
function sortArguments() {
    let sortedArgs = arguments.sort();
    return sortedArgs; // This will never happen
}
console.log(sortArguments(5, 3, 7, 1));
// Thows a TypeError (arguments.sort is not a function)


function sortArguments() {
    let args = Array.from(arguments);
    let sortedArgs = args.sort();
    return sortedArgs;
}
console.log(sortArguments(5, 3, 7, 1)); // 1, 3, 5, 7