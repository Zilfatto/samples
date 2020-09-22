import { produce } from 'immer';
import { pipe } from 'lodash/fp';

// Exercise 1
const input = { tag: 'JAVASCRIPT' };

const getString = obj => obj.tag;
const toLowerCase = str => str.toLowerCase;
const addParan = str => `(${str})`;

const transform = pipe(getString, toLowerCase, addParan);

const output = transform(input);
console.log(output);


// Exercie 2
const recipe = {
  name: 'Spaghetti Bolognese',
  ingredients: ['eggs', 'salt']
};

const addIngredient = ingredient => {
  const newRecipe = { ...recipe, ingredients: [...recipe.ingredients] };
  return newRecipe.ingredients.push(ingredient);
};

const replaceIngredient = (newIngredient, oldIngredient) => {
  const newRecipe = { ...recipe, ingredients: [...recipe.ingredients] };
  const index = newRecipe.ingredients.indexOf(oldIngredient);
  return newRecipe.ingredients.splice(index, 1, newIngredient);
};

const removeIngredient = ingredient => {
  return {
    ...recipe,
    ingredients: [...recipe.ingredients.filter(ing => ing !== ingredient)]
  };
};


// Using "Immer"
function addIng(ingredient) {
  return produce(recipe, draftRecipe => {
    draftRecipe.ingredients.push(ingredient);
  });
}
function replaceIng(oldIngredient, newIngredient) {
  return produce(recipe, draftRecipe => {
    const index = draftRecipe.ingredients.indexOf(oldIngredient);
    draftRecipe.ingredients.splice(index, 1, newIngredient);
  });
}
function RemoveIng(ingredient) {
  return produce(recipe, draftRecipe => {
    draftRecipe.ingredients = draftRrecipe.ingredients.filter(ing => ing !== ingredient);
  });
}
