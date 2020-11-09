const p = new Promise((resolve, reject) => {
  // Kick off some async work
  setTimeout(() => {
    const number = Math.floor((Math.random() * 100) + 1);
    // pending => resolved, fulfilled
    // pending => rejected
    return number % 2 === 0 ? resolve('Even') : reject(new Error('Bad luck - Odd'));
  }, 2000);
});

console.log(p);

// First function - "onfulfilled"
// Second function - "onrejected" also replace the catch block
p.then(value => console.log('Fulfilled ', value), reason => console.log('Rejected ', reason));

// THe result is the same
p
  .then(value => console.log('Fulfilled ', value))
  .catch(error => console.log('FROM Catch ', error));