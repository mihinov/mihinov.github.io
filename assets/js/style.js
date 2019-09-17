function setProgress(percent, selector) {
  let circle = selector.querySelector('.progressbar__thumb');
  let total = Math.PI * circle.r.baseVal.value;
  circle.style.strokeDasharray = `${total*percent/100} ${total*(1-percent/100)*2}`;
  selector.querySelector('text').innerHTML = '<tspan>' + percent.toFixed(0) + '</tspan>%';
}

function circle (number, final, selector) {
	let mainSelector = document.querySelector(selector);
	let timer = setInterval(function () {
		setProgress(number, mainSelector);
		if (number == final) {
			clearInterval(timer);
		}
		number += 1;
	}, 50);
}

circle(0, 90, '.progress__container:nth-child(1)');
circle(0, 80, '.progress__container:nth-child(2)');
circle(0, 70, '.progress__container:nth-child(3)');
circle(0, 90, '.progress__container:nth-child(4)');


function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}


function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}


function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 5) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 10);
    if (speed >= 10) speed = 10;
    var step = Math.round(distance / 100);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}

let upShot = document.getElementById('up__shot');
upShot.addEventListener('click', () => {
	smoothScroll('home');
});