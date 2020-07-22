// Variables for making navigation bar sticky on scrolling
const navbar = document.getElementById('navbar'),
    wrapBar = document.getElementById('wrapBar');
let sticky = wrapBar.offsetTop,
    navbarHeight = navbar.offsetHeight,
    prevScrollPos = window.pageYOffset,
    isMobile;
document.getElementById('myAccordion').style.display = 'none';
// Make a sticky navbar if the user scrolled down enough
window.addEventListener('scroll', makeSticky);
// Close a menu when the user clicks outside it
navbar.addEventListener('click', function() {closeMenu(event);}, true);
// Close menu if a user resize the window (or change from landscape to portrait mode or vice versa)
(function () {
    let prevWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        const currentWidth = window.innerWidth;
        // Take actions only if the resize was horisontally
        if (prevWidth !== currentWidth) {
            sticky = wrapBar.offsetTop;
            navbarHeight = navbar.offsetHeight;
            if ((prevWidth >= 701 && currentWidth < 701) || (prevWidth < 701 && currentWidth >= 701)) {
                closeAllNav();
            }
        }
        prevWidth = currentWidth;
    });
})();
if (screen.width < 601 || screen.height < 601) {
    isMobile = true;
    // Make hero image scroll on mobile devices
    document.getElementById('head_img').style.backgroundAttachment = 'scroll';
}
// In case if the user clicks anywhere outside of the navbar menu
function closeMenu(event) {
    if (event.target === navbar) {
        closeAllNav();
    }
}
// Creating or deleting overlay under navbar menu via which to close it. Only if it's sticky
function overlay(n) {
    if (n === 1) {
        listenersForNavBar('add');
        navbar.style.height = '112%';
    } else {
        listenersForNavBar('remove');
        navbar.style.height = 'auto';
    }
}
// Closing navbar menu by clicking outside it, on other elements if overlay is disabled
function listenersForNavBar(action) {
    const cont = document.querySelectorAll('.cont'),
        j = cont.length;
    if (action === 'add') {
        for (let i = 0; i < j; i++) {
            cont[i].addEventListener('click', closeAllNav, true);
            cont[i].addEventListener('wheel', closeAllNav, true);
            cont[i].addEventListener('touchstart', closeAllNav, true);
        }
    } else {
        for (let i = 0; i < j; i++) {
            cont[i].removeEventListener('click', closeAllNav, true);
            cont[i].removeEventListener('wheel', closeAllNav, true);
            cont[i].removeEventListener('touchstart', closeAllNav, true);
        }
    }
}
// Make navbar sticky and hiding it on scrolling down
function makeSticky() {
    const currentScrollPos = window.pageYOffset;
    // Fix a navbar at the top when the user scrolls to needful position
    if ((currentScrollPos >= sticky && prevScrollPos < sticky) || (currentScrollPos >= prevScrollPos && currentScrollPos >= sticky)) {
        navbar.classList.add('w3-top');
        wrapBar.style.height = navbarHeight.toString() + 'px';
    } else if (currentScrollPos < sticky) {
        navbar.classList.remove('w3-top');
        wrapBar.style.height = 'auto';
    }
    // When a user scrolls down, navbar will hide and if he scrolls up it will appear
    if (currentScrollPos >= (sticky + navbarHeight)) {

        if (prevScrollPos > currentScrollPos) {
            navbar.style.top = '0';
        } else {
            navbar.style.top = '-55px';
        }
    }
    prevScrollPos = currentScrollPos;
}
// Open or close navbar menu on small screen
function openBar(e) {
    const accord = document.getElementById('myAccordion');
    if (accord.style.display === 'none') {
        overlay(1);
        accord.style.display = 'block';
    } else {
        overlay(0);
        accord.style.display = 'none';
    }
    document.getElementById('hamburger').classList.toggle('change');
}
// Close navbar menu on small screen
function closeBar() {
    overlay(0);
    document.getElementById('hamburger').classList.remove('change');
    document.getElementById('myAccordion').style.display = 'none';
}
// Adding content to or removing from navbar menu for small screen
function openMenu(name) {
    const currentSection = document.getElementById('section_' + name),
        accordBtn = document.getElementById('accord_btn');
    if (currentSection.innerHTML === '') {
        currentSection.innerHTML = document.getElementById('nav_' + name).innerHTML;
    } else {
        currentSection.innerHTML = '';
    }
    if (accordBtn) {
        accordBtn.querySelector('i').classList.toggle('w3-hide');
        accordBtn.getElementsByTagName('i')[1].classList.toggle('w3-hide');
    }
}
// Open navbar menu on large and medium screens or close on second click
function openNav(name) {
    if (document.getElementById('nav_' + name).style.display === 'block') {
        overlay(0);
        closeNav(name);
    } else {
        let navBtn = document.getElementById('navbtn_' + name);
        overlay(1);
        document.getElementById('nav_' + name).style.display = 'block';

        if (navBtn) {
            navBtn.querySelector('i').style.display = 'none';
            navBtn.getElementsByTagName('i')[1].style.display = 'inline';
        }
    }
}
// Close all navbar menus
function closeAllNav() {
    closeNav('info');
    closeBar();
}
// Close navbar menu for lafrge and medium screens
function closeNav(name) {
    const navBtn = document.getElementById('navbtn_' + name);
    overlay(0);
    document.getElementById('nav_' + name).style.display = 'none';
    if (navBtn) {
        navBtn.querySelector('i').style.display = 'inline';
        navBtn.getElementsByTagName('i')[1].style.display = 'none';
    }
}
// Function for setting hrefs on images and loading them after a body has finished loading
function loadImgsAfterBody(imgUrls, media) {
    document.body.onload = () => {
        const imgElems = document.getElementsByClassName('load-after-body');
        // If there are different images depending on screen size (in particular - source tag)
        if (media) {
            for (let i = 0, j = imgElems.length; i < j; i++) {
                if (imgElems[i].tagName === 'SOURCE') {
                    imgElems[i].srcset = imgUrls[i];
                } else {
                    imgElems[i].src = imgUrls[i];
                }
            }
        } else {
            for (let i = 0, j = imgElems.length; i < j; i++) {
                imgElems[i].src = imgUrls[i];
            }
        }
    };
}
// Load certain images when a user has scrolled down the middle of a page
function loadAfterScrollMid(imgUrls) {
    const imgElems = document.getElementsByClassName('last-load'),
        height = document.body.scrollHeight;

    window.addEventListener('scroll', function loadBottomImgs() {
        // Load after a user scrolled 35% of a page
        if (window.pageYOffset > (0.35 * height)) {
            for (let i = 0, j = imgElems.length; i < j; i++) {
                if (imgElems[i].tagName === 'DIV') {
                    imgElems[i].style.backgroundImage = 'url("' + imgUrls[i] + '")';
                } else if (imgElems[i].tagName === 'SOURCE') {
                    imgElems[i].srcset = imgUrls[i];
                } else {
                    imgElems[i].src = imgUrls[i];
                }
            }
            window.removeEventListener('scroll', loadBottomImgs);
        }
    });
}
// Make a link to certain page active
function makeActive(name) {
    document.querySelector(name).classList.add('w3-black');
}
// Update number of items in the badge
function updateCount() {
    const number = cart.length,
        badge = document.querySelector('.badge');
    // Hide badge if there is no items in cart
    if (number === 0) {
        badge.classList.add('w3-hide');
    } else {
        badge.innerText = number;
        badge.classList.remove('w3-hide');
    }
}
// Setting data into sessionStorage
function setStorageObj(key, value) {
    if (!key || !value) {
        return;
    }
    sessionStorage[key] = JSON.stringify(value);
}
// Getting data from sessionStorage
function getStorageObj(key) {
    return JSON.parse(sessionStorage[key]);
}