function add(a, b) {
  return a + b;
}

// N arguments => 1

function add(a) {
  return function (b) {
    return a + b;
  };
}

const add1 = add(1);
add1(5);

// Or
add(1)(5); // Instead of (1, 5)


const add = a => b => a + b; // Instead of (a, b) => a + b


function wrap(type) {
  return function (str) {
    return `<${type}>${str}</${type}>`;
  }
}
const wrap = type => str => `<${type}>${str}</${type}>`;