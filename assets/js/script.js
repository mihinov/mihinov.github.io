var reqAnimFrame = (function() {
    return requestAnimationFrame       ||
           mozRequestAnimationFrame    ||
           webkitRequestAnimationFrame ||
           oRequestAnimationFrame      ||
           msRequestAnimationFrame     ||
    function(callback) {
        setTimeout(callback, 1000 / 60);
    }
})();
var myReq = null;

function setProgress(percent, selector) {
    let circle = selector.querySelector('.progressbar__thumb');
    let total = Math.PI * circle.r.baseVal.value;
    circle.style.strokeDasharray = `${total*percent/100} ${total*(1-percent/100)*2}`;
    selector.querySelector('text').innerHTML = '<tspan>' + percent.toFixed(0) + '</tspan>%';
    console.log(percent.toFixed(0));
}

function circle(final, i) {
    let number = -1;
    i++;
    let selector = '.progress__container:nth-child(' + i + ')';
    let mainSelector = document.querySelector(selector);
	function circleStep() {
        myReq = reqAnimFrame(circleStep);
        setProgress(number, mainSelector);
        if (number >= final) {
            cancelAnimationFrame(myReq);
        }
        number++;
    }
    circleStep();
}

var burger = document.querySelector('.burger'); // BURGER
var main__nav = document.querySelector('.main__nav');// MAIN__NAV
var toggle = false;

burger.addEventListener('click', () => {
    if (toggle == 'toggle') {
        toggle = false;
        up__shot.style.display = 'block';
        document.body.style.overflow = 'auto';
    } else {
        toggle = 'toggle';
        up__shot.style.display = 'none';
        document.body.style.overflow = 'hidden';
    }
    burger.classList.toggle('toggle');
    main__nav.classList.toggle('toggle');
});

main__nav.addEventListener('click', (target) => {
    if (toggle == 'toggle') {
        toggle = false;
        up__shot.style.display = 'block';
        document.body.style.overflow = 'auto';
        burger.classList.toggle('toggle');
        main__nav.classList.toggle('toggle');
    }
});

var up__shot = document.querySelector('.up__shot');
var dataCircle = document.getElementsByClassName('progressbar__thumb');
var attr = [];
var circleStartBoolean = [];
for (let k = 0; k < dataCircle.length; k++) {
    attr[k] = dataCircle[k].getAttribute('data-circle');
    circleStartBoolean[k] = false;
}

window.addEventListener('scroll', () => {

    var posY = window.pageYOffset || document.documentElement.scrollTop;

    function scrollUp() {
        var maxHeight = document.documentElement.clientHeight/3;
        if (posY > maxHeight) {
            up__shot.classList.add('visible');

        } else {
            up__shot.classList.remove('visible');
        }
    }

    function headerVisible() {
        var intro = document.querySelector('.intro');
        var header = document.querySelector('.header');
        var height__intro = intro.offsetHeight; // высота intro
        if (posY+1 >= height__intro) { // если posY+1 > высоты intro, то появится header
            header.classList.add('fixed');
            header.classList.remove('unvisible');
        } else {   
            if (header.classList.length == 2) {
                header.classList.add('unvisible');
            }
            header.classList.remove('fixed');
        }
    }

    function visibleCircle(i, num, target) {
        var targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            left: window.pageXOffset + target.getBoundingClientRect().left,
            right: window.pageXOffset + target.getBoundingClientRect().right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
        windowPosition = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };

        if (targetPosition.bottom > windowPosition.top &&
            targetPosition.top + 50 < windowPosition.bottom &&
            targetPosition.right > windowPosition.left &&
            targetPosition.left < windowPosition.right) {
                if (circleStartBoolean[i] == false) {
                    circleStartBoolean[i] = true;
                    circle(num, i);
                    console.log(1);
                }
        }
    };

    scrollUp();
    for (var i = 0; i < dataCircle.length; i++) {
        visibleCircle(i, attr[i], dataCircle[i]);
    }
    if (!toggle) {
        headerVisible();
    }

});
