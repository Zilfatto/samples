""" Making asynchronous programming easier with async and await """

function hello() {
    return 'Hello';
}
hello();
// The function returns "Hello" — nothing special, right?
async function hello() {
    return 'Hello';
}
hello();
// Invoking the function now returns a promise. This is one of the traits of async functions — their return values are guaranteed to be converted to promises.

// Other ways to create this:
let hello = async function() { return 'Hello' };
hello();
let hello = async () => { return 'Hello' };

hello().then(value => console.log(value));
// Or
hello().then(console.log);


// The await keyword
// The real advantage of async functions becomes apparent when you combine it with the await keyword — in fact, await only works inside async functions.
async function hello() {
    return greeting = await Promise.resolve('Hello');
}
hello().then(alert);


// Rewriting promise code with async/await


fetch('coffee.jpg').then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        return Promise.blob();
    }
}).then(myBlob => {
    let objectURL = URL.createObjectURL;
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
}).catch(e => {
    console.log(`There has been a problem with your fetch operation: ${e.message}`)
});

// Converting this to use async/await to see how much simpler it makes things
async function myFetch() {
    let response = await fetch('coffee.jpg');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        let myBlob = await response.blob();
        let objectURL = URL.createObjectURL(myBlob);
        let image = document.createElement('img');
        image.src = objectURL;
        document.body.appendChild(image);
    }
}
myFetch().catch(e => {
    console.log(`There has been a problem with your fetch operation: ${e.message}`);
});
// It makes code much simpler and easier to understand — no more .then() blocks everywhere!

// Since an async keyword turns a function into a promise, you could refactor your code to use a hybrid approach of promises
// and await, bringing the second half of the function out into a new block to make it more flexible:
async function myFetch() {
    let response = await fetch('coffee.jpg');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        return await response.blob()
    }
}
myFetch().then(blob => {
    let objectURL = URL.createObjectURL(blob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
}).catch(e => console.log(e));


// Adding error handling
// You can use a synchronous try...catch structure with async/await.
async function myFetch() {
    try {
        let response = await fetch('coffee.jpg');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            let myBlob = await response.blob();
            let objectURL = URL.createObjectURL(myBlob);
            let image = document.createElement('img');
            image.src = objectURL;
            document.body.appendChild(image);
        }
    } catch(e) {
        console.log(e);
    }
}
myFetch();
// The catch() {} block is passed an error object, which we've called e; we can now log that to the console,
// and it will give us a detailed error message showing where in the code the error was thrown


// If you wanted to use the second (refactored) version of the code that we showed above, you would be better off
// just continuing the hybrid approach and chaining a .catch() block onto the end of the .then() call

// This is because the .catch() block will catch errors occurring in both the async function call and the promise chain.
// If you used the try/catch block here, you might still get unhandled errors in the myFetch() function when it's called.



// Awaiting a Promise.all()
// async/await is built on top of promises, so it's compatible with all the features offered by promises.
async function fetchAndDecode(url, type) {
    let repsonse = await fetch(url);
    let content;
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        if (type === 'blob') {
            content = await response.blob();
        } else if (type === 'text') {
            content = await response.text();
        }
        return content;
    }
}

async function displayContent() {
    let coffee = fetchAndDecode('coffee.jpg', 'blob');
    let tea = fetchAndDecode('tea.jpg', 'blob');
    let description = fetchAndDecode('description.txt', 'text');

    let values = await Promise.all([coffee, tea, description]);

    let objectURL1 = URL.createObjectURL(values[0]);
    let objectURL2 = URL.createObjectURL(values[1]);
    let descText = values[2];
    
    let image1 = document.createElement('img');
    let image2 = document.createElement('img');
    image1.src = objectURL1;
    image2.src = objectURL2;
    document.body.appendChild(image1);
    document.body.appendChild(image2);

    let para = document.createElement('p');
    para.textContent = descText;
    document.body.appendChild(para);
}
displayContent().catch(e => console.log(e));
// You'll see that the fetchAndDecode() function has been converted easily into an async function with just a few changes.

// It is also possible to use a sync finally block within an async function, in place of a .finally() async block,



// The downsides of async/await

// Async/await makes your code look synchronous, and in a way it makes it behave more synchronously.
// The await keyword blocks execution of all the code that follows until the promise fulfills, exactly as it would with
// a synchronous operation. It does allow other tasks to continue to run in the meantime, but your own code is blocked.

// This means that your code could be slowed down by a significant number of awaited promises happening straight after one another.
// Each await will wait for the previous one to finish, whereas actually what you want is for the promises to begin
// processing simultaneously, like they would do if we weren't using async/await.


// We've got two examples available. Both of them start off with a custom promise function that fakes an async process with a setTimeout() call
function timeoutPromise(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve('done');
        }, interval);
    });
}
// Then each one includes a timeTest() async function that awaits three timeoutPromise() calls:
async function timeTest() {
    ...
}
// Each one ends by recording a start time, seeing how long the timeTest() promise takes to fulfill,
// then recording an end time and reporting how long the operation took in total:
let startTime = Date.now();
timeTest().then(() => {
    let finishTime = Date.now();
    let timeTaken = finishTime - startTime;
    alert(`Time taken in milliseconds: ${timeTaken}`);
});
It is the timeTest() function that differs in each case.

// In the slow-async-await.html example, timeTest() looks like this:
async function timeTest() {
    await timeoutPromise(3000);
    await timeoutPromise(3000);
    await timeoutPromise(3000);
}
// Here we simply await all three timeoutPromise() calls directly, making each one alert for 3 seconds.
// Each subsequent one is forced to wait until the last one finished — if you run the first example,
// you'll see the alert box reporting a total run time of around 9 seconds.

// In the fast-async-await.html example, timeTest() looks like this:
async function timeTest() {
    const timeoutPromise1 = timeoutPromise(3000);
    const timeoutPromise2 = timeoutPromise(3000);
    const timeoutPromise3 = timeoutPromise(3000);

    await timeoutPromise1;
    await timeoutPromise2;
    await timeoutPromise3;
}
// Here we store the three Promise objects in variables, which has the effect of setting off
// their associated processes all running simultaneously.

// Next, we await their results — because the promises all started processing
// at essentially the same time, the promises will all fulfill at the same time;
// when you run the second example, you'll see the alert box reporting a total run time of just over 3 seconds!

// You'll have to test your code carefully, and bear this in mind if performance starts to suffer.

// Another minor inconvenience is that you have to wrap your awaited promises inside an async function.



// Async/await class methods
class Person {
    constructor(first, last, age, gender, interests) {
        this.name = {
            first,
            last
        };
        this.age = age;
        this.gender = gender;
        this.interests = interests;
    }
    async greeting() {
        return await Promise.resolve(`Hi! I'm ${this.name.first}`);
    };
    farewell() {
        console.log(`${this.name.first} has left the building. Bye for now!`);
    };
}
let han = new Person('Han', 'Solo', 25, 'male', ['Smuggling']);
// The first class method could now be used something like this:
han.greeting().then(console.log);