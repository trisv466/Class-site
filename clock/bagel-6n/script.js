var mutebutton = document.getElementById("mutebutton");

mutebutton.addEventListener("click", mute);

var mutestatus = false;

function mute() {
	var audio = document.getElementById("audio");
	if (mutestatus == false) {
		audio.muted = true;
		audio.pause();
		mutestatus = true;
	}
	else if (mutestatus == true) {
		audio.muted = false;
		audio.play();
		mutestatus = false;
	}
}