import { produce } from 'immer';

// Not immutable way
let book = { title: 'Harry potter' };

function publish(book) {
  book.isPublished = true;
}

publish(book);
console.log(book);




let book = { title: 'Harry potter' };

function publish(book) {
  return produce(book, draftBook => {
    draftBook.isPublished = true;
  });
}

const updated = publish(book);
console.log(book);
console.log(updated);