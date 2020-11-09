// GLobal object
console.log('Something');
global.console.log('Something');

setTimeout();
global.setTimeout();

const myVar = 'Something';
function myFunc() { return 'Hello'; }
// Variables and function defined in a module are not global. They have a module scope
// It needs to export them to make them available to the outside
console.log(global.myVar); // undefined
console.log(myVar); // Something
console.log(global.myFunc()); // undefined
console.log(myFunc()); // Hellob


// Modules.  In node every file is a module
// "module" appears to be global, but it's not
console.log(module); // Will give a module data (id, exports, parent, filename and so on)