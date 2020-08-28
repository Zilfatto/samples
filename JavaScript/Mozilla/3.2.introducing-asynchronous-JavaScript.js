const btn = document.querySelector('button');
btn.addEventListener('click', () => {
    alert('You clicked me!');

    let pElem = document.createElement('p');
    pElem.textContent = 'This is a newly-added paragraph.';
    document.body.appendChild(pElem);
});
// 1. An alert() message appears.
// 2. Once the alert is dismissed, we create a <p> element.
// 3. We then give it some text content.
// 4. Finally, we append the paragraph to the document body.
// While each operation is being processed, nothing else can happen — rendering is paused.
// This is because as we said in the previous article, JavaScript is single threaded. 


// Asyncronous JavaScript
// When you fetch an image from a server, you can't return the result immediately.
// That means that the following (pseudocode) wouldn't work:
let response = fetch('myImage.png');
let blob = response.blob();
// That's because you don't know how long the image will take to download,
// so when you come to run the second line it will throw an error (possibly intermittently,
// possibly every time) because the response is not yet available.


// Async callbacks
btn.addEventListener('click', () => {
    alert('You clicked me!');

    let pElem = document.createElement('p');
    pElem.textContent = 'This is a newly-added paragraph.';
    document.body.appendChild(pElem);
});
// The first parameter is the type of event to be listened for,
// and the second parameter is a callback function that is invoked when the event is fired.

// When we pass a callback function as an argument to another function, we are only passing
// the function's reference as an argument, i.e, the callback function is not executed immediately.
// It is “called back” (hence the name) asynchronously somewhere inside the containing function’s body.
// The containing function is responsible for executing the callback function when the time comes.


function loadAsset(url, type, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = type;

    xhr.onload = function() {
        callback(xhr.response);
    }
    xhr.send();
}

function displayImage(blob) {
    let objectURL = URL.createObjectURL(blob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
}
loadAsset('coffee.jpg', 'blob', displayImage);


// Note that not all callbacks are async — some run synchronously. An example is when we use Array.prototype.forEach() to loop through the items in an array
const gods = ['Apollo', 'Artemis', 'Ares', 'Zeus'];
gods.forEach(function(eachName, index) {
    console.log(`${index}. ${eachName}`);
});



// Promises
fetch('products.json').then(function(response) {
    return response.json();
}).then(function(json) {
    products = json;
    initialize();
}).catch(function(err) {
    console.log(`Fetch problem: ${err.message}`);
});
// Two then() blocks. Both contain a callback function that will run
// if the previous operation is successful, and each callback receives as input the result of
// the previous successful operation, so you can go forward and do something else to it.
// Each .then() block returns another promise, meaning that you can chain multiple .then() blocks onto each other,
// so multiple asynchronous operations can be made to run in order, one after another.

// The catch() block at the end runs if any of the .then() blocks fail — in a similar way to synchronous try...catch blocks,
// an error object is made available inside the catch(), which can be used to report the kind of error that has occurred.
// Note however that synchronous try...catch won't work with promises, although it will work with async/await, as you'll learn later on.



// The event queue
// Async operations like promises are put into an event queue, which runs after the main thread has finished processing so that they do not block
// subsequent JavaScript code from running. The queued operations will complete as soon as possible then return their results to the JavaScript environment.



// The nature of asynchronous code
console.log('Starting');
let image;

fetch('coffee.jpg').then((response) => {
    console.log('It worked: ');
    return response.blob();
}).then((MyBlob) => {
    let objectURL = URL.createObjectURL(myBlob);
    image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
}).catch((error) => {
    console.log(`There has been a problem with your fetch operation: ${error.message}`);
});

console.log('All done!');
// Starting
// All done!
// It worked :)


// For security reasons, you can't fetch() files from your local filesystem (or run other such operations locally);
// to run the above example locally you'll have to run the example through a local webserver.



























