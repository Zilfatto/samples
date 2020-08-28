""" DESTRUCTURING ASSIGNMENT """

let a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20
[a, b, ...rest] = [10, 20, 30, 40, 50];
// Expected to be Array [30, 40, 50]
console.log(rest);
({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
console.log(b); // 20
// Stage 4(finished) proposal
({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}

// The parentheses ( ... ) around the assignment statement are required
// when using object literal destructuring assignment without a declaration.
({a, b} = {a: 1, b: 2}); // is valid, as is
const {a, b} = {a: 1, b: 2};


const x = [1, 2, 3, 4, 5];
const [y, z] = x;
console.log(y); // 1
console.log(z); // 2
// Default values
let a, b;
[a=5, b=7] = [1];
console.log(a); // 1
console.log(b); // 7


// Swapping variables
let a = 1;
let b = 3;
[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1

const arr = [1, 2, 3];
[arr[2], arr[1]] = [arr[1], arr[2]];
console.log(arr); // [1, 3, 2]


// Parsing an array returned from a function
function f() {
    return [1, 2];
}
let a, b;
[a, b] = f();
console.log(a); // 1
console.log(b); // 2

function g() {
    return [1, 2, 3];
}
const [a, , b] = g();
console.log(a); // 1
console.log(b); // 3
const [c] = g();
console.log(c); // 1

const [a, ...b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // [2, 3]

const [a, ...b,] = [1, 2, 3];
// SyntaxError: rest element may not have a trailing comma
// Always consider using rest operator as the last element


// Unpacking values form a regular expression match
function parseProtocol(url) {
    const parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
    if (!parsedURL) {
        return false;
    }
    console.log(parsedURL);
    // ["https://developer.mozilla.org/en-US/Web/JavaScript", 
    // "https", "developer.mozilla.org", "en-US/Web/JavaScript"]
    const [, protocol, fullhost, fullpath] = parsedURL;
    return protocol;
}
console.log(parseProtocol('https://developer.mozilla.org/en-US-Web/JavaScript'));
// "https"


const user = {
    id: 42,
    isVerified: true
}
const {id, isVerified} = user;
console.log(id); // 42
console.log(isVerified); // true

// Assigning to new variable names
const o = {p: 42, q: true};
const {p: foo, q: bar} = o;
console.log(foo); // 42
console.log(bar); // true
// Assigning to new variables names and provoding default values
const {a: aa = 10, b: bb = 5} = {a: 3};
console.log(aa); // 3
console.log(bb); // 5


// Unpacking fields form objects passed as function parameter
const user = {
    id: 42,
    displayName: 'jdoe',
    fullName: {
        firstName: 'John',
        lastName: 'Doe'
    }
};
function userId({id}) {
    return id;
}
function whois({displayName, fullName: {firstName: name}}) {
    return `${displayName} is ${name}`;
}
console.log(userId(user)); // 42
console.log(whois(user)); // "jdoe is John"

function drawChart({size = 'big', coords = {x: 0, y: 0}, radius = 25} = {}) {
    console.log(size, coords, radius);
    // do some chart drawing
}
// You could have also written the function without the right-hand side assignment.
// However, if you leave out the right-hand side assignment, the function will look for
// at least one argument to be supplied when invoked, whereas in its current form,
// you can simply call drawChart() without supplying any parameters. The current design is useful
//  if you want to be able to call the function without supplying any parameters, the other can be useful
// when you want to ensure an object is passed to the function.
drawChart({
    coords: {x: 18, y: 30},
    radius: 30
});


// Nested object and array destructuring
const metadata = {
    title: 'Scratchpad',
    translations: [
        {
            locale: 'de',
            localizationTags: [],
            lastEdit: '2014-04-14T08:43:37',
            url: '/de/docs/Tools/Scratchpad',
            title: 'JavaScript-Umgebung'
        }
    ],
    url: '/en-US/docs/Tools/Scratchpad'
};

let {
    title: englishTitle, // rename
    translations: [
        {
            title: localTitle, // rename
        },
    ],
} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localTitle); // "JavaScript-Umgebung"


// For of iteration and destructuring
const people = [
    {
        name: 'Mike Smith',
        family: {
            mother: 'Jane Smith',
            father: 'Harry Smith',
            sister: 'Samantha Smith'
        },
        age: 35
    },
    {
        name: 'Tom Jones',
        family: {
            mother: 'Norah Jones',
            father: 'Richard Jones',
            brother: 'Howard Jones'
        },
        age: 25
    }
];

for (const {name: n, family: {father: f}} of people) {
    console.log('Name: ' + n + ', Father: ' + f);
}
// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"

// Computed object property names and destructuring
let key = 'z';
let {[key]: foo} = {z: 'bar'};
console.log(foo); // "bar"

// Invalid JavaScript identifier as a property name
const foo = { 'fizz-buzz': true };
const { 'fizz-buzz': fizzBuzz } = foo;
console.log(fizzBuzz); // "true"

// Combined Array and Obect destructuring
const props = [
    { id: 1, name: 'Fizz' },
    { id: 2, name: 'Buzz' },
    { id: 3, name: 'FizzBuzz' }
]
const [,, {name}] = props;
console.log(name); // "FizzBuzz"


// The prototype chain is looked up when the object is deconstructured
let obj = {self: '123'};
obj.__proto__.prot = '456';
const {self, prot} = obj;
// self "123"
// prot "456" (Access to the prototype chain)
















