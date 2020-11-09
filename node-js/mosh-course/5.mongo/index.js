const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(error => console.log('Could not connect to MongoDB...', error));

const humanSchema = new mongoose.Schema({
  name: String,
  age: Number,
  tags: [String],
  date: { type: Date, default: Date.now },
  isSmart: Boolean
});
// Classes (human), object (John)
// Course, nodeCourse
// To create a class, like, Course we need to compile this schema into a model

// Data Types
// String
// Number
// Date
// Buffer - for binary
// Boolean
// ObjectID
// Array

const Human = mongoose.model('Human', humanSchema);

async function createHuman() {
  const human = new Human({
    name: 'Maria',
    age: 30,
    tags: ['tall', 'attractive'],
    isSmart: false
  });

  const result = await human.save();
  console.log(result);
}

async function getHumans() {
  // Basic complex query
  const smartHumans = await Human
    .find({ isSmart: true })
    .limit(10)
    .sort({ name: 1 })
    // .sort('name')
    // .sort('-name')
    .select({ name: 1, tags: 1 });
  // .select('name tags');
  console.log(smartHumans);


  // Comparison Query Operatiors
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)
  const comparedHumans = await Human
    .find({ isSmart: true, age: { $gte: 18, $lte: 30 } })
    // .find({ age: { $in: [20, 30, 40] } })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(comparedHumans);


  // Logical Query Operators
  // or
  // and
  const logicalHumans = await Human
    .find()
    .or([{ name: 'Maria' }, { isSmart: true }])
    // .and([ { age: { $gte: 20 } }, { isSmart: true } ]) // technically is simillar to passing a filter obj to a find method
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(logicalHumans);


  // Regular Expressions
  const regularHumans = await Human
    // Starts with James
    // .find({ name: /^James/i })

    // Ends with Johnson
    // .find({ name: /Johnson$/i })

    // Contains James
    .find({ name: /.*James.*/i })

    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(regularHumans);


  // Counting
  const countedHumans = await Human
    .find({ isSmart: true })
    .limit(10)
    .sort({ name: 1 })
    .count();
  console.log(countedHumans);


  // Pagination
  const pageNumber = 2;
  const pageSize = 10;
  // /api/humans?pageNumber=2&pageSize=10
  const paginatedHumans = await Human
    .find({ isSmart: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(paginatedHumans);
}

async function updateHuman(id) {
  // Approach: Query first - if updating requires to be valid (only change author if a course is not published)
  // findById()
  // Modify its properties
  // save()

  const human = await Human.findById(id);
  if (!human) return;
  human.isSmart = true;
  human.tags.push('lucky');
  // Another way
  // human.set({
  //   isSmart: true,
  //   tags: [...human.tags, 'lucky']
  // });

  const newHuman = await human.save();
  console.log(newHuman);


  // Approach: Update first
  // Update directly
  // Optionally: get the updated document
  const result = await Human.update({ _id: id }, { // Or to use { isSmart: false } for more generic, instead of { _id: id }
    $set: {
      isSmart: true,
      tags: ['lucky']
    }
  });
  console.log(result);

  // For getting updated object
  const updatedHuman = await Human.findByIdAndUpdate(id, {
    $set: {
      isSmart: true,
      tags: ['lucky']
    }
  }, { new: true });
  console.log(updatedHuman);
}

async function removeHuman(id) {
  const result = await Human.deleteOne({ _id: id }); // Or more generic { isSmart: false }
  const result2 = await Human.deleteMany({ isSmart: false });
  // For getting removed object
  const human = await Human.findByIdAndRemove(id);
  console.log(result);
  console.log(human);
}

// createHuman();
// getHumans();
// updateHuman('5f9bb0862a7e1b4ee80b11fc');
// removeHuman('5f9bb0862a7e1b4ee80b11fc');