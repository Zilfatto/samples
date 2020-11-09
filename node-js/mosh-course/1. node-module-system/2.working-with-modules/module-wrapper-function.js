// What's happening underneath the hood
// Node wraps every file in module wrapper function (self-invoking function OR immediately invoked function expression)
(function (exports, require, module, __filename, __dirname) {

  // Here my code goes
  const x = 10;
  console.log('Good!');
  // There two ways for adding variables or functions to exports
  // Directly to exports OR via module.exports
  console.log(exports);
  console.log(module);

  // I can do this
  module.exports.x = x;
  exports.x = x;
  // Also reset exports
  module.exports = x;
  // But the following does not work, it won't export anything.
  // Because this way, exports vatiable will lose the connetion with module.exports property
  // Firstly, both module.exports and exports point to the same object. And all the exporting happening from module.exports property
  exports = x;

  console.log(__filename);
  console.log(__dirname);
})