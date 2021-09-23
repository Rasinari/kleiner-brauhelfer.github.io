---
---


// Slideshow from w3css ---
var slideIndex = 0;
var runningTimeOut = false;

function carousel(idx) {
  var i;
  var x = document.querySelectorAll('.dark-choice .mySlides.hide-light');
  if (!x.length){
      x = document.querySelectorAll('.mySlides.hide-dark');
  }
  if (!x.length){
      console.info('no Slideshow found');
      return
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  var dots = document.querySelectorAll('.slide-indicators .dot-mark');
  for (i = 0; i < x.length; i++) {
    dots[i].classList.remove('active');
  }
  var overlay = document.querySelector('.slideshow-overlay');
  slideIndex = (idx) ? idx : slideIndex + 1;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].classList.add('active');
  overlay.href = x[slideIndex-1].src;
  if (runningTimeOut) {clearTimeout(runningTimeOut);}
  runningTimeOut = setTimeout(carousel, 5000);
}
// ---/ Slideshow from w3css


// Bind EventListeners
function addListeners() {
    // Theme Switcher
    var themeSwitches = document.querySelectorAll('.theme-switcher');
    for (let index = 0; index < themeSwitches.length; index++) {
        jtd.addEvent(themeSwitches[index], 'click', function() {
            // Set Preferences, mark Dot, load Theme
            var theme = this.dataset.theme;
            sessionStorage.setItem('theme', theme);
            this.classList.add('active');
            setThemes();
        });
    }
}

// Theme Setter (after Pageload)
function setThemes() {
    var theme_color = sessionStorage.getItem('theme') || 'light';
    console.info("Setting Theme", theme_color);
    var css_theme = document.getElementById('style-' + theme_color);
    // style Theme Markers
    var marker = document.querySelectorAll('.theme-switcher');
    for (let inner_idx = 0; inner_idx < marker.length; inner_idx++) {
        if (marker[inner_idx].dataset.theme == theme_color){
            marker[inner_idx].classList.add('active');
        }else{
            marker[inner_idx].classList.remove('active');
        }
    }
    if (theme_color == 'dark' || theme_color == 'night') {
        // Mark new Choice
        document.body.classList.remove('light-choice');
        document.body.classList.add('dark-choice');
    }else{
        document.body.classList.remove('dark-choice');
        document.body.classList.add('light-choice');
    }
    // set Theme
    document.head.appendChild(css_theme);
}

// Expand / Collapse following Paragraph
function toggleParagraph(that) {
    that.parentNode.classList.toggle('open');
    var p_id = that.parentNode.id + '_box';
    p = document.getElementById(p_id);
    p.classList.toggle('w3-hide');
}