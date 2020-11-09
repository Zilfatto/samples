const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(error => console.log('Could not connect to MongoDB...', error));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 255,
    match: /^([A-Za-z]|\s|-)*$/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network']
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        // Do some async work
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 3000);
      },
      message: 'A course should have at least one tag'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: { type: Boolean, required: true },
  price: {
    type: Number,
    required: function () { return this.isPublished },
    min: 1,
    max: 300
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'React Course',
    author: 'Jack',
    category: 'web',
    tags: ['react', 'frontend'],
    isPublished: true,
    price: 10
  });

  try {
    const result = await course.save();
    console.log(result);
    // Manual validation
    // await course.validate();
  }
  catch (ex) {
    console.log(ex.message);
  }
}

createCourse();