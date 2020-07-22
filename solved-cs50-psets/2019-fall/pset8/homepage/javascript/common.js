// Getting header, body and span(tip) elements
let header = document.getElementById('colour');
let body = document.querySelector('body');
let tip = document.querySelector('#tooltiptext1');
// Changing colour of the header of a left column
header.onmouseover = function() {
    this.style.color = '#3C9F40';
    this.style.cursor = 'no-drop';
};
header.onmouseout = function() {
    this.style.color = 'black';
};
// Show and hide tip beside the header
function showtip() {
    if (tip.style.visibility === 'visible') {
        tip.style.visibility = 'hidden';
    } else {
        tip.style.visibility = 'visible';
    }
}

body.onload = window.setInterval(showtip, 4000);