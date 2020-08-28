""" Graceful asynchronous programming with Promises """

// One of the most common engagements you'll have with promises is with web APIs
// that return a promise. Let's consider a hypothetical video chat application.
// The application has a window with a list of the user's friends, and clicking on
// a button next to a user starts a video call to that user.
function handleCallButton(evt) {
    setStatusMessage('Calling...');
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then(chatStream => {
            selfViewElem.srcObject = chatStream;
            chatStream.getTracks().forEach(track => myPeerConnection.addTrack(track, chatStream));
            setStatusMessage('Connected');
        }).catch(err => {
            setStatusMessage('Failed to connect');
        });
}


// The trouble with callbacks
// Let's talk about ordering pizza as an analogy. There are certain steps that you have to take for your order to be successful,
// which doesn't really make sense to try to execute out of order, or in order but before each previous step has quite finished
chooseToppings(function(toppings) {
    placeOrder(toppings, function(order) {
        collectOrder(order, function(pizza) {
            eatPizza(pizza);
        }, failureCallback);
    }, failureCallback);
}, failureCallback);
// This is messy and hard to read (often referred to as "callback hell"), requires the failureCallback()
// to be called multiple times (once for each nested function), with other issues besides.


// Improvements with promises
chooseToppings().then(function(toppings) {
    return placeOrder(toppings);
}).then(function(order) {
    return collectOrder(order);
}).then(function(pizza) {
    eatPizza(pizza);
}).catch(failureCallback);

// Using arrow functions, you can simplify the code even further:
chooseToppings()
.then(toppings =>
    placeOrder(toppings)
)
.then(order =>
    collectOrder(order)
)
.then(pizza =>
    eatPizza(pizza)
)
.catch(failureCallback);

// Or even this
chooseToppings()
.then(toppings => placeOrder(toppings))
.then(order => collectOrder(order))
.then(pizza => eatPizza(pizza))
.catch(failureCallback);

// You could even do this
chooseToppings().then(placeOrder).then(collectOrder).then(eatPizza).catch(failureCallback);
// This is not quite as easy to read, however, and this syntax might not be usable
// if your blocks are more complex than what we've shown here.


// Explaining basic promise syntax: A real example
let promise = fetch('coffee.jpg');
promise.then(response => response.blob());
// Fetch promises do not fail on 404 or 500 errors — only on something catasrophic like a network failure.
// Instead, they succeed, but with the response.ok property set to false. To produce an error on a 404, for example,
// we need to check the value of response.ok, and if false, throw an error, only returning the blob if it is true.
let promise2 = promise.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        return response.blob();
    }
});

let promise3 = promise2.then(myBlob => {
    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
});

// Responding to failure
let errorCase = promise3.catch(e => {
    console.log(`There has been a problem with your fetch operation: ${e.message}`);
});


// Chaining the blocks together
fetch('coffee.jpg').then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        return response.blob();
    }
}).then(myBlob => {
    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
}).catch(e => {
    console.log(`There has been a problem with your fetch operation: ${e.message}`);
});
// Bear in mind that the value returned by a fulfilled promise becomes
// the parameter passed to the next .then() block's executor function.


// Running code in response to multiple promises fulfilling

// If you want to run some code only after a whole bunch of promises have all fulfilled?
// You can do this with the ingeniously named Promise.all() static method. This takes an array of promises as an input parameter
// and returns a new Promise object that will fulfil only if and when all promises in the array fulfil
Promise.all([a, b, c]).then(values => {

});
// If they all fulfil, the chained .then() block's executor function will be passed an array containing
// all those results as a parameter. If any of the promises passed to Promise.all() reject, the whole block will reject.
let a = fetch(url1);
let b = fetch(url2);
let c = fetch(url3);
Promise.all([a, b, c]).then(values => {

});
// Our code doesn't care when the fetch() operations are done. Instead,
// what we want is the loaded data. That means we want to run the Promise.all() block
// when we get back usable blobs representing the images, and a usable text string.
function fetchAndDecode(url, type) {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (type === 'blob') {
            return response.blob();
        } else if (type === 'text') {
            return response.text();
        }
    }).catch(e => {
        console.log(`There has been a problem with your fetch operation for resource "${url}": ` + e.message);
    });
}

let coffee = fetchAndDecode('coffee.jpg', 'blob');
let tea = fetchAndDecode('tea.jpg', 'blob');
let description = fetchAndDecode('desription.txt', 'text');

Promise.all([coffee, tea, description]).then(values => {
    console.log(values);
    // Store each value returned from the promises in separate variables; create object URLs from the blobs
    let objectURL1 = URL.createObjectURL(values[0]);
    let objectURL2 = URL.createObjectURL(values[1]);
    let descText = values[2];
    // Display the image in <img> elements
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


// Running some final code after a promise fulfills/rejects
myPromise
.then(response => {
    doSomething(response);
    runFinalCode();
})
.catch(e => {
    returnError(e);
    runFinalCode();
});
// In more recent modern browsers, the .finally() method is available,
// which can be chained onto the end of your regular promise chain allowing you to cut down on code repetition and do things more elegantly.
myPromise
.then(response => {
    doSomething(response);
})
.catch(e => {
    returnError(e);
})
.finally(() => {
    runFinalCode();
});



function fetchAndDecode(url, type) {
    return fetch(url).then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            if(type === 'blob') {
                return response.blob();
            } else if(type === 'text') {
                return response.text();
            }
        }
    })
    .catch(e => {
        console.log(`There has been a problem with your fetch operation for resource "${url}": ` + e.message);
    })
    .finally(() => {
        console.log(`fetch attempt for "${url}" finished.`);
    });
}


// Building your own custom promises

// Using the Promise() constructor
// here we wrap a setTimeout() call with a promise — this runs a function after two seconds that resolves the promise (using the passed resolve() call) with a string of "Success!".
let timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve('Success!');
    }, 2000);
});

timeoutPromise.then(message => {
    alert(message);
});
// Or even just
timeoutPromise.then(alert);

// Rejecting a custom promise
function timeoutPromise(message, interval) {
    return new Promise((resolve, reject) => {
        if (message === '' || typeof message !== 'string') {
            reject ('Message is empty or not a string');
        } else if (interval < 0 || typeof interval !== 'number') {
            reject ('Interval is negative or not a number');
        } else {
            setTimeout(function() {
                resolve(message);
            }, interval);
        }
    });
}

timeoutPromise('Hello there!', 1000).then(message => {
    alert(message);
}).catch(e => {
    console.log(`Error: ${e}`);
});