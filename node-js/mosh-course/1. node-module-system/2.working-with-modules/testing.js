// Here my code goes
const x = 10;
const y = 200;
console.log('Good!');

console.log('Module', module);

module.exports.y = y;
console.log('Module', module);
exports = x;

console.log('Module', module);
console.log('Exports', exports);
