const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 1');
    resolve(1);
    reject(new Error('Something went wrong'));
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 2');
    resolve(2);
  }, 2000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 3');
    reject(new Error('Something went wrong'));
  }, 2000);
});
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 4');
    resolve(4);
  }, 2000);
});
const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 5');
    resolve(5);
  }, 2000);
});
const p6 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 6');
    resolve(6);
  }, 2000);
});
const p7 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 7');
    resolve(7);
  }, 2000);
});
const p8 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 8');
    resolve(8);
  }, 2000);
});
const p9 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 9');
    resolve(9);
  }, 2000);
});
const p10 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 10');
    resolve(10);
  }, 2000);
});
const p11 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 11');
    resolve(11);
  }, 2000);
});
const p12 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 12');
    resolve(12);
  }, 2000);
});

Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12])
  .then(result => console.log(result))
  .catch(error => console.log(error.message));

// If I want to do something as soon as one of these async operations completes (fulfills)
Promise.race([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12])
  .then(value => console.log(value))
  .catch(error => console.log(error.message));