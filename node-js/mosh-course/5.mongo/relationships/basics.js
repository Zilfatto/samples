// Trade off between query performance vs consistency

// Using References (Normalization) -> CONSISTENCY
let author = {
  name: 'Jack'
};

let course = {
  author: 'id'
};

// Using Embedded Documents (Denormalization) -> PERFORMANCE
let course = {
  author: {
    name: 'Jack'
  }
};

// Using Hybrid approach
let author = {
  name: 'Maria',
  age: 30,
  interests: ['tennis', 'cooking', 'diving']
  // 47 other properties
};

let course = {
  author: {
    id: 'ref',
    name: 'Maria'
  }
};