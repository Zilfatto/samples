""" Choosing the right approach """

// Asynchronous callbacks
function loadAsset(url, type, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = type;
    xhr.onload = function() {
        callback(xhr.response);
    };
    xhr.send();
}
function displayImage(blob) {
    let objectURL = URL.createObjectURL(blob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
}
loadAsset('coffee.jpg', 'blob', displayImage);
// Pitfalls
// - Nested callbacks can be cumbersome and hard to read (i.e. "callback hell").
// - Failure callbacks need to be called once for each level of nesting, whereas with promises you can just use
// a single .catch() block to handle the errors for the entire chain.
// - Async callbacks just aren't very graceful.
// - Promise callbacks are always called in the strict order they are placed in the event queue; async callbacks aren't.
// - Async callbacks lose full control of how the function will be executed when passed to a third-party library.


// setTimeout()
let myGreeting = setTimeout(function() {
    alert('Hello, Mr. Universe!');
}, 2000);
// Pitfalls
// You can use recursive setTimeout() calls to run a function repeatedly in a similar fashion to setInterval(), using code like this:
let i = 1;
setTimeout(function run() {
    console.log(i);
    i++;
    setTimeout(run, 100);
}, 100);
// There is a difference between recursive setTimeout() and setInterval():

// - Recursive setTimeout() guarantees at least the specified amount of time (100ms in this example) will elapse between
// the executions; the code will run and then wait 100 milliseconds before it runs again.
// The interval will be the same regardless of how long the code takes to run.
// - With setInterval(), the interval we choose includes the time taken to execute the code we want to run in.
// Let's say that the code takes 40 milliseconds to run — the interval then ends up being only 60 milliseconds.



// setInterval()
function displayTime() {
    let date = new Date();
    let time = date.toLocaleTimeString();
    document.getElementById('demo').textContent = time;
}
const createClock = setInterval(displayTime, 1000);
// Pitfalls
// The frame rate isn't optimized for the system the animation is running on,
// and can be somewhat inefficient. Unless you need to choose a specific (slower) framerate,
// it is generally better to use requestAnimationFrame().



// requestAnimationFrame()
const spinner = document.querySelector('div');
let rotateCount = 0;
let startTime = null;
let rAF;
function draw(timestamp) {
    if (!startTime) {
        startTime = timestamp;
    }
    rotateCount = (timestamp - startTime) / 3;
    if (rotateCount > 359) {
        rotateCount %= 360;
    }
    spinner.style.transform = `rotate(${rotateCount})deg`;
    rAF = requestAnimationFrame(draw);
}
draw();
// Pitfalls
// You can't choose a specific framerate with requestAnimationFrame(). If you need to run
// your animation at a slower framerate, you'll need to use setInterval() or recursive setTimeout().



// Promises
fetch('coffee.jpg')
.then(response => response.blob())
.then(myBlob => {
    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
})
.catch(e => {
    console.log(`There has been a problem with your fetch operation: ${e.message}`);
});
// Pitfalls
// Promise chains can be complex and hard to parse. If you nest a number of promises,
// you can end up with similar troubles to callback hell. For example
remotedb.allDocs({
    include_docs: true,
    attachments: true
}).then(function(result) {
    let docs = result.rows;
    docs.forEach(function(element) {
        localdb.put(element.doc).then(function(response) {
            alert(`Pulled doc with id ${element.doc._id} and added to local db.`);
        }).catch(function(err) {
            if (err.name === 'conflict') {
                localdb.get(element.doc._id).then(function(resp) {
                    localdb.remove(resp._id, resp._rev).then(function(resp) {
                        // et cetera
                    })
                })
            }
        })
    })
})
// It is better to use the chaining power of promises to go with a flatter, easier to parse structure:
remotedb.allDocs(...).then(function(resultOfAllDocs) {
    return localdb.put(...);
}).then(function(resultOfPut) {
    return localdb.get(...);
}).then(function(resultOfGet) {
    return localdb.pur(...);
}).catch(function(err) {
    console.log(err);
});
// Or even
remotedb.allDocs(...)
.then(resultOfAllDocs => {
    return localdb.put(...);
})
.then(resultOfPut => {
    return localdb.get(...);
})
.then(resultOfGet => {
    return localdb.put(...);
})
.catch(err => console.log(err));



// Promise.all()
function fetchAndDecode(url, type) {
    // Returning the top level promise, so the result of the entire chain is returned out of the function
    return fetch(url).then(response => {
        // Depending on what type of file is being fetched, use the relevant function to decode its contents
        if (type === 'blob') {
            return response.blob();
        } else if (type === 'text') {
            return response.text();
        }
    })
    .catch(e => {
        console.log(`There has been a problem with your fetch operation: ${e.message}`);
    });
}
// Call the fetchAndDecode() method to fetch the images and the text, and store their promises in variables
let coffee = fetchAndDecode('coffee.jpg', 'blob');
let tea = fetchAndDecode('tea.jpg', 'blob');
let description = fetchAndDecode('description.txt', 'text');
// Use Promise.all() to run code only when all three function calls have resolved
Promise.all([coffee, tea, description]).then(values => {
    console.log(values);
    // Store each value returned from the promises in separate variables; create object URLs from the blobs
    let objectURL1 = URL.createObjectURL(values[0]);
    let objectURL2 = URL.createObjectURL(values[1]);
    let descText = values[2];
    // Display the images in <img> elements
    let image1 = document.createElement('img');
    let image2 = document.createElement('img');
    image1.src = objectURL1;
    image2.src = objectURL2;
    document.body.appendChild(image1);
    document.body.appendChild(image2);
    // Display the text in a paragraph
    let para = document.createElement('p');
    para.textContent = descText;
    document.body.appendChild(para);
});
// Pitfalls
// If a Promise.all() rejects, then one or more of the promises you are feeding into it
// inside its array parameter must be rejecting, or might not be returning promises at all.
// You need to check each one to see what they returned. 



// Async/await
async function myFetch() {
    let response = await fetch('coffee.jpg');
    let myBlob = await response.blob();
    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
}
myFetch();
// Pitfalls
// - You can't use the await operator inside a non-async function, or in the top level context of your code.
// This can sometimes result in an extra function wrapper needing to be created,
// which can be slightly frustrating in some circumstances. But it is worth it most of the time.
// Browser support for async/await is not as good as that for promises. If you want to use async/await
// but are concerned about older browser support, you could consider using the BabelJS library — this allows you to write
// your applications using the latest JavaScript and let Babel figure out what changes if any are needed for your user’s browsers.










