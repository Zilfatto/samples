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

// createCourse();
function getCourses() {
  // Basic complex query
  return Course
    .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
    // .or([{ tags: 'frontend' }, { tags: 'backend' }])
    .sort('-price')
    .select('name author price');
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();