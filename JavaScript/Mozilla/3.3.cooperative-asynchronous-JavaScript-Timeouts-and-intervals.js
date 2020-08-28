""" Cooperative asynchronous JavaScript: Timeouts and intervals """

// SetTimeout
// The specified amount of time (or the delay) is not the guaranteed time to execution,
// but rather the minimum time to execution. The callbacks you pass to these functions cannot run until
// the stack on the main thread is empty.

// As a consequence, code like setTimeout(fn, 0) will execute as soon as the stack is empty,
// not immediately. If you execute code like setTimeout(fn, 0) but then immediately after run a loop
// that counts from 1 to 10 billion, your callback will be executed after a few seconds.


let myGreeting = setTimeout(function() {
    alert('Hello, Mr. Universe!');
}, 2000);

// WIth a named function
let myGreeting = setTimeout(function sayHi() {
    alert('Hello, Mr. Universe!');
}, 2000);

// With a funciton defined separately
function sayHi() {
    alert('Hello Mr. Universe!');
}
let myGreeting = setTimeout(sayHi, 2000);


// Passing parameters to a setTimeout() function
function sayHi(who) {
    alert(`Hello ${who}!`);
}
let myGreeting = setTimeout(sayHi, 2000, 'Mr. Universe');
// Clearing timeout
clearTimeout(myGreeting);


// SetInterval
function displayTime() {
    let date = new Date();
    let time = date.toLocaleTimeString();
    document.getElementById('demo').textContent = time;
}
const createClock = setInterval(displayTime, 1000);
// Clearing intervals
const myInterval = setInterval(myFunction, 2000);
clearInterval(myInterval);



// Creating your own stopwatch
// Define a counter variable for the number of seconds and set it to zero.
let secondCount = 0;
// Define a global to store the interval when it is active.
let stopWatch;
// Store a reference to the display paragraph in a variable
const displayPara = document.querySelector('.clock');

// Function to calculate the current hours, minutes, and seconds, and display the count
function displayCount() {
    // Calculate current hours, minutes, and seconds
    let hours = Math.floor(secondCount/3600);
    let minutes = Math.floor((secondCount % 3600)/60);
    let seconds = Math.floor(secondCount % 60)
    // Display a leading zero if the values are less than ten
    let displayHours = (hours < 10) ? '0' + hours : hours;
    let displayMinutes = (minutes < 10) ? '0' + minutes : minutes;
    let displaySeconds = (seconds < 10) ? '0' + seconds : seconds;
    // Write the current stopwatch display time into the display paragraph
    displayPara.textContent = displayHours + ':' + displayMinutes + ':' + displaySeconds;
    // Increment the second counter by one
    secondCount++;
}
// Store references to the buttons in constants
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
// When the start button is pressed, start running displayCount() once per second using setInterval()
startBtn.addEventListener('click', () => {
    stopWatch = setInterval(displayCount, 1000);
    startBtn.disabled = true;
});
// When the stop button is pressed, clear the interval to stop the count.
stopBtn.addEventListener('click', () => {
    clearInterval(stopWatch);
    startBtn.disabled = false;
});
// When the reset button is pressed, set the counter back to zero, then immediately update the display
resetBtn.addEventListener('click', () => {
    clearInterval(stopWatch);
    startBtn.disabled = false;
    secondCount = 0;
    displayCount();
});
// Run displayCount() once as soon as the page loads so the clock is displayed
displayCount();


// Recursive timeouts
let i = 1;
setTimeout(function run() {
    console.log(i);
    i++;
    setTimeout(run, 100);
}, 100);

// this uses setInterval
setInterval(function run() {
    console.log(i);
    i++
}, 100);


// Immediate timeouts
setTimeout(function() {
    alert('World');
}, 0);
alert('Hello');
// For instance, the code below outputs an alert containing "Hello",
// then an alert containing "World" as soon as you click OK on the first alert.

// This can be useful in cases where you want to set a block of code to run
// as soon as all of the main thread has finished running — put it on the async event loop,
// so it will run straight afterwards


// Clearing with clearTimeout() or clearInterval()

// clearTimeout() and clearInterval() both use the same list of entries to clear from. Interestingly enough,
// this means that you can use either method to clear a setTimeout() or setInterval().
// For consistency, you should use clearTimeout() to clear setTimeout() entries and clearInterval() to clear
// setInterval() entries. This will help to avoid confusion.



// requestAnimationFrame()
// The method takes as an argument a callback to be invoked before the repaint.
function draw() {
    // Drawing code goes here
    requestAnimationFrame(draw);
}
draw();


// Including a timestamp
let startTime = null;
function draw(timestamp) {
    if (!startTime) {
        startTime = timestamp;
    }
    currentTime = timestamp - startTime;
    // Do something based on current time
    requestAnimationFrame(draw);
}
draw();