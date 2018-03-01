

// var mutebutton = document.getElementById("mutebutton");

// mutebutton.addEventListener("click", mute);

// var mutestatus = false;

// function mute() {
// 	var audio = document.getElementById("audio");
// 	if (mutestatus == false) {
// 		audio.muted = true;
// 		audio.pause();
// 		mutestatus = true;
// 	}
// 	else if (mutestatus == true) {
// 		audio.muted = false;
// 		audio.play();
// 		mutestatus = false;
// 	}
// }

// // var umutebutton = document.getElementById("umutebutton");

// // umutebutton.addEventListener("click", mute);

// // var mutestatus = true;

// //   function play(){
// //        var audio = document.getElementById("audio");
// //        audio.play();
// //                  }


// // var unmutebutton = document.getElementById("unmutebutton");

// // unmutebutton.addEventListener("click", unmutebutton);

// // var mutestatus = true;

// // function mute() {
// // 	var audio = document.getElementById("audio");
// // 	if (mutestatus == true) {
// // 		audio.muted = false;
// // 		audio.pause();
// // 		mutestatus = false;
// // 	}
// // 	else if (mutestatus == false) {
// // 		audio.muted = true;
// // 		audio.play();
// // 		mutestatus = true;
// // 	}
// // }



// var unmutebutton = document.getElementById("unmutebutton");

// unmutebutton.addEventListener("click", unmute);

// var mutestatus = true;

// function unmute() {
// 	var audio = document.getElementById("audio");
// 	if (mutestatus == true) {
// 		audio.muted = false;
// 		audio.pause();
// 		mutestatus = false;
// 	}
// 	else if (mutestatus == false) {
// 		audio.muted = true;
// 		audio.play();
// 		mutestatus = true;
// 	}
// }

// function replace( hide, show ) {
//   document.getElementById(hide).style.display="none";
//   document.getElementById(show).style.display="block";
// }

var audio, mutebutton, seek_bar;
function initAudioPlayer(){
	audio = new Audio();
	audio.src = "munch.mp3";
	audio.loop = true;
	audio.play();
	// Set object references
	// playbtn = document.getElementById("playpausebtn");
	mutebutton = document.getElementById("mutebutton");
	// Add Event Handling
	// playbtn.addEventListener("click",playPause);
	mutebutton.addEventListener("click", mute);
	// Functions
	// function playPause(){
	// 	if(audio.paused){
	// 	    audio.play();
	// 	    playbtn.style.background = "url(images/pause.png) no-repeat";
	//     } else {
	// 	    audio.pause();
	// 	    playbtn.style.background = "url(images/play.png) no-repeat";
	//     }
	// }
	function mute(){
		if(audio.muted){
		    audio.muted = false;
		    mutebutton.style.background = "url(mutebutton.png) no-repeat";
	    } else {
		    audio.muted = true;
		    mutebutton.style.background = "url(unmutebutton.png) no-repeat";
	    }
	}
}
window.addEventListener("load", initAudioPlayer);


