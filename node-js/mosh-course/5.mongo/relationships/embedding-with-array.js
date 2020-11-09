const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.update({ _id: courseId }, {
    $set: {
      'author.name': 'Another name'
    }
  });
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.push(author);
  await course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  await course.save();
}

// removeAuthor('courseId', 'authorId');

// addAuthor('courseId', new Author({ name: 'Anny' }));

// listCourses();

// updateAuthor('authorId');

// createCourse('Node Course', [
//   new Author({ name: 'Frank' }),
//   new Author({ name: 'John' })
// ]);