const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(error => console.log('Could not connect to MongoDB...', error));

const courseSchema = new mongoose.Schema({
  name: String,
  price: Number,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  await new Course({ tags: ["express", "backend"], date: "2018-01-24T21:42:27.388Z", name: "Express.js Course", author: "Mosh", isPublished: true, price: 10 }).save();
  await new Course({ tags: ["node", "backend"], date: "2018-01-24T21:42:47.912Z", name: "Node.js Course", author: "Mosh", isPublished: true, price: 20 }).save();
  await new Course({ tags: ["aspnet", "backend"], date: "2018-01-24T21:42:59.605Z", name: "ASP.NET MVC Course", author: "Mosh", isPublished: true, price: 15 }).save();
  await new Course({ tags: ["react", "frontend"], date: "2018-01-24T21:43:21.589Z", name: "React Course", author: "Mosh", isPublished: false }).save();
  await new Course({ tags: ["node", "backend"], date: "2018-01-24T21:44:01.075Z", name: "Node.js Course by Jack", author: "Jack", isPublished: true, price: 12 }).save();
  await new Course({ tags: ["node", "backend"], date: "2018-01-24T21:47:53.128Z", name: "Node.js Course by Mary", author: "Mary", isPublished: false, price: 12 }).save();
  await new Course({ tags: ["angular", "frontend"], date: "2018-01-24T21:56:15.353Z", name: "Angular Course", author: "Mosh", isPublished: true, price: 15 }).save();
}

// createCourse();
function getCourses() {
  // Basic complex query
  return Course
    .find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();