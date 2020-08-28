// By default, everything that we define in a module is considered to be private.
// So it won't be accessible to the outside, unless we explicitly export ot

// This _radius is not accessible in other modules (this is a part of the "implementation detail" of the circle module)
const _radius = new WeakMap();
// We export this. It is called "Public Interface"
class Circle {
  constructor(radius) {
    _radius.set(this, radius);
  }

  draw() {
    console.log('Circle with radius' + _radius.get(this));
  }
}

// For this case
module.exports = Circle;

// For multiple objects
module.exports.Circle = Circle;
module.exports.Square = Square;