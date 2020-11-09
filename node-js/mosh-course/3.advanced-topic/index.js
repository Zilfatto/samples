const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
// It is very rare case when we need two or more debug functions in the same folder, so
// const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const debug = require('debug')('app:startup');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
// Not compulsory, but, if I want to overwrite the path to templates
app.set('views', './views'); // default ./views

// Accessinng the environment
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);
// If env is not set
// process.env.NODE_ENV will return undefined
// app.get('env') will return 'development'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

// Configuratuon
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
// console.log(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  // Set env variable DEBUG=app:startup for showing this kind of messages
  // Set env DEBUG=app:startup,app:db   for showing logs related to startup and db
  // Set DEBUG=app:*  for showing everything
  // Set DEBUG=       for sshowing nothing
  // Faster way is to combine in the shell- DEBUG=app:* nodemon index.js
  // startupDebugger('Morgan is enabled...');
  debug('Morgan is enabled...');
}

app.use(logger);

// Some day in the future with DB
// dbDebugger('Connected to the database...');

// In shell for bash - export PORT=5000, for windows - set PORT=5000
const port = process.env.PORT || 3000;

const humans = [
  { id: 1, name: 'David', age: 30 },
  { id: 2, name: 'Frank', age: 44 },
  { id: 3, name: 'John', age: 34 },
  { id: 4, name: 'Jane', age: 25 }
];

app.get('/', (req, res) => {
  res.render('index', { title: 'My Express App', message: 'Hello from Node' });
});

app.get('/api/humans', (req, res) => {
  res.send(humans);
});

app.post('/api/humans', (req, res) => {
  const { error } = validateHuman(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const human = {
    id: humans.length + 1,
    name: req.body.name,
    age: req.body.age
  };

  humans.push(human);
  res.send(human);
});

app.put('/api/humans/:id', (req, res) => {
  const { id } = req.params;
  const human = humans.find(human => human.id == Number(id));
  if (!human) return res.status(404).send('The human with the given ID was not found.');

  const { error } = validateHuman(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  human.name = req.body.name;
  human.age = req.body.age;
  res.send(human);
});

app.get('/api/humans/:id', (req, res) => {
  const { id } = req.params;
  const human = humans.find(human => human.id == Number(id));
  if (!human) return res.status(404).send('The human with the given ID was not found.');
  res.send(human);
});

app.delete('/api/humans/:id', (req, res) => {
  const { id } = req.params;
  const index = humans.findIndex(human => human.id == Number(id));
  if (index === -1) return res.status(404).send('The human with the given ID was not found.');

  const human = humans.splice(index, 1)[0];
  res.send(human);
});

function validateHuman(human) {
  const schema = {
    name: Joi.string().min(3).required().label('Your name'),
    age: Joi.number().required().label('Your age')
  };

  return Joi.validate(human, schema);
}

app.listen(port, () => console.log(`Listening on port ${port}...`));