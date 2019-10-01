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

var upShot = document.getElementById('up__shot');

upShot.addEventListener('click', () => {
	window.scrollTo(0, 0);
});

window.addEventListener('scroll', () => {

    var posY = window.pageYOffset || document.documentElement.scrollTop;

    function scrollUp () {
        var maxHeight = document.documentElement.clientHeight/3;
        if (posY > maxHeight) {
            up__shot.style.opacity = "0.7";

        } else {
            up__shot.style.opacity = "0";
        }
    }

    scrollUp();

    var intro = document.querySelector('.intro');
    var header = document.querySelector('.header');
    var height__intro = intro.offsetHeight; // высота intro
    if (posY+1 >= height__intro) {
        header.style.position = 'fixed';
        header.style.backgroundColor = 'black';
    } else {
        header.style.position = 'absolute';
        header.style.backgroundColor = 'rgba(255,255,255,0)';
    }

});