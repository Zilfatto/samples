// Hide the extra text after body has loaded
body.onload = function() {
    document.querySelector('#info').style.display = 'none';
};
let trig = document.getElementById('trig');
// Changing the extra text when button is clicked
trig.onclick = function() {
    let info = document.getElementById('info');
    if (info.style.display === 'none') {
        info.style.display = 'block';
    } else {
        info.style.display = 'none';
    }
};



