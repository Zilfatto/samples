import { Map } from 'immutable';

// Not immutable way
let book = { title: 'Harry potter' };

function publish(book) {
  book.isPublished = true;
}

publish(book);
console.log(book);


// With "immutable"
let book = Map({ title: 'Harry potter' });

function publish(book) {
  return book.set('isPublished', true);
}

book = publish(book);
// To convert to a plain JS object
console.log(book.toJS());


// Difficulties: Have to learn new API and it is hard to integrate with other JS libraries
console.log(book.get('title'));