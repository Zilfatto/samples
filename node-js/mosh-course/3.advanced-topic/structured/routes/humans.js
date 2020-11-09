const Joi = require('joi');
const express = require('express');
const router = express.Router();

const humans = [
  { id: 1, name: 'David', age: 30 },
  { id: 2, name: 'Frank', age: 44 },
  { id: 3, name: 'John', age: 34 },
  { id: 4, name: 'Jane', age: 25 }
];

router.get('/', (req, res) => {
  res.send(humans);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const human = humans.find(human => human.id == Number(id));
  if (!human) return res.status(404).send('The human with the given ID was not found.');

  const { error } = validateHuman(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  human.name = req.body.name;
  human.age = req.body.age;
  res.send(human);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = humans.findIndex(human => human.id == Number(id));
  if (index === -1) return res.status(404).send('The human with the given ID was not found.');

  const human = humans.splice(index, 1)[0];
  res.send(human);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const human = humans.find(human => human.id == Number(id));
  if (!human) return res.status(404).send('The human with the given ID was not found.');
  res.send(human);
});

function validateHuman(human) {
  const schema = {
    name: Joi.string().min(3).required().label('Your name'),
    age: Joi.number().required().label('Your age')
  };

  return Joi.validate(human, schema);
}

module.exports = router;