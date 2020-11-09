// Creating a promise that is already resolved
// Useful for unit testing
const p = Promise.resolve({ id: 1 });
p.then(result => console.log(result));

// Opposite
const p = Promise.reject(new Error('Reason for rejection...'));
p.catch(error => console.log(error));
