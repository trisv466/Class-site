//Listener for range input
var spinLR = document.getElementById("spinLR"),
	spinTB = document.getElementById("spinTB"),
		rotator = document.getElementById("rotator"),
	box = document.getElementById("wrapper"),
	bWall = document.getElementById("bWall");

var xVal = 0,
	yVal = 0;
console.log(xVal)
//Control for Left to Right spinner
spinLR.addEventListener("input", function() {
	yVal = Math.floor(this.value);
	box.style.webkitTransform = 'rotateY(' + Math.floor(this.value) + 'deg) translateZ(' + 8 + 'vw)';
	//bWall.style.backgroundPosition="0 "+yVal+"";
	
}, false);
//Control for Top to Bottom spinner
spinTB.oninput = function() {
	xVal = Math.floor(this.value);
	box.style.webkitTransform = 'rotateY(' + yVal + 'deg) translateZ(' + Math.floor(this.value) + 'vw)';
};


document.onkeydown = checkKey;

var zVal,
		xVal,
		Z = document.querySelector('#spinTB'),
		X = document.querySelector('#spinLR');

zVal = Z.value;
xVal = X.value;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        zVal = Z.value;
				zVal++;
				Z.value = zVal;
				box.style.webkitTransform = 'rotateY(' + xVal + 'deg) translateZ(' + zVal + 'vw)';
    }
    else if (e.keyCode == '40') {
        zVal = Z.value;
				zVal--;
				Z.value = zVal;
				box.style.webkitTransform = 'rotateY(' + xVal + 'deg) translateZ(' + zVal + 'vw)';
    }
    else if (e.keyCode == '37') {
       	xVal = X.value;
				xVal--;
				X.value = xVal;
				box.style.webkitTransform = 'rotateY(' + xVal + 'deg) translateZ(' + zVal + 'vw)';
    }
    else if (e.keyCode == '39') {
       xVal = X.value;
				xVal++;
				X.value = xVal;
				box.style.webkitTransform = 'rotateY(' + xVal + 'deg) translateZ(' + zVal + 'vw)';
    }

}