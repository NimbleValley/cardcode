var paragraph = document.getElementById("p");

var numStarters = 0;
newText();

function newText(delay) {
	setTimeout(() => {
		paragraph.textContent += "Scroll to get the free gift card code. ";
		if (numStarters < 100) {
			numStarters++;
			newText(100 - numStarters);
		}
	}, delay);
}

window.onscroll = (e) => {
	for (var i = 0; i < 100; i++) {
		paragraph.textContent += "Please keep scrolling! You are almost there ;). ";
	}
}

//----------------------------------------

if (window.addEventListener) {
	window.addEventListener('DOMMouseScroll', wheel, false);
	window.onmousewheel = document.onmousewheel = wheel;
}

function wheel(event) {
	var delta = 0;
	if (event.wheelDelta) delta = (event.wheelDelta) / 120;
	else if (event.detail) delta = -(event.detail) / 3;

	handle(delta);
	if (event.preventDefault) event.preventDefault();
	event.returnValue = false;
}

function handle(sentido) {
	var inicial = document.body.scrollTop;
	var time = 1000;
	var distance = 200;
	animate({
		delay: 0,
		duration: time,
		delta: function(p) {
			return p;
		},
		step: function(delta) {
			window.scrollTo(0, inicial - distance * delta * sentido);
		}
	});
}

function animate(opts) {
	var start = new Date();
	var id = setInterval(function() {
		var timePassed = new Date() - start;
		var progress = (timePassed / opts.duration);
		if (progress > 1) {
			progress = 1;
		}
		var delta = opts.delta(progress);
		opts.step(delta);
		if (progress == 1) {
			clearInterval(id);
		}
	}, opts.delay || 10);
}