""" General asynchronous programming concepts """

const btn = document.querySelector('button');
btn.addEventListener('click', () => {
    let myDate;
    for (let i = 0; i < 10000000; i++) {
        myDate = new Date();
    }
    console.log(myDate);
    let pElem = document.createElement('p');
    pElem.textContent = 'This is a newly-added paragraph';
    document.body.appendChild(pELem);
});


const canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);
let ctx = canvas.getContext('2d');
let alertBtn = document.querySelector('.alert');
let fillBtn = document.querySelector('.fill');
function degToRad(degrees) {
        return degrees * Math.PI / 180;
};
function random(min,max) {
        var num = Math.floor(Math.random()*(max-min)) + min;
        return num;
}
function expensiveOperation() {
    for (let i = 0; i < 1000000; i++) {
        ctx.fillStyle = 'rgba(0,0,255, 0.2)';
        ctx.beginPath();
        ctx.arc(random(0, canvas.width), random(0, canvas.height), 10, degToRad(0), degToRad(360), false);
        ctx.fi
        fill();
    }
}
fillBtn.addEventListener('click', expensiveOperation);
alertBtn.addEventListener('click', () => {
    alert('You clicked me!');
});
// OK, in our case, it is ugly and we are faking the blocking effect, but this is a common problem that developers of real apps fight to mitigate all the time.



// Threads
Task A --> Task B --> Task C

Thread 1: Task A --> Task B
Thread 2: Task C --> Task D

Main thread: Render circles to canvas --> Display alert()

Main thread: Task A --> Task C
Worker thread: Expensive task B

// Asynchronous code
Main thread: Task A --> Task B

  Main thread: Task A --> Task B --> |Task D|
Worker thread: Task C -----------> |      |

Main thread: Task A                   Task B
    Promise:      |__async operation__|