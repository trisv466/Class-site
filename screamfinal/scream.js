   $("#helpicon").click(function() {
  $('.transform').toggleClass('transform-active');
});

$("#helpicon").click(function() {
  $('.transformblack').toggleClass('transformblack-active');
});

   $("#byebye").click(function() {
  $('.transform').toggleClass('transform-active');
});

$("#byebye").click(function() {
  $('.transformblack').toggleClass('transformblack-active');
});



//Volum Move -----------------------------------------------------------------------------------------------------

//Variables

var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH=1800;
var HEIGHT=1000;
var rafID = null;

//Access mic -----------------------------------------------------------------------------------------------------

window.onload = function() {

    // grab our canvas
    canvasContext = document.getElementById( "meter" ).getContext("2d");
    
    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    
    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia = 
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }

}


function didntGetStream() {
    alert('Stream generation failed.');
}

var mediaStreamSource = null;

function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

   

    // kick off the visual updating
    drawLoop();

}

// //Get random colour faaiiiil didnt work-----------------------------------------------------------------------------------------------------
    
// function getRandomColor() {
//     var letters = '0123456789ABCDEF'.split('');
//     var color = '#';
//     console.log(color);
//     for (var i = 0; i < 6; i++ ) {
//     color += letters[Math.floor(Math.random() * 16)];
   
//     }

//     return color;

//     console.log(color);

// }

//Drawing JS -----------------------------------------------------------------------------------------------------


function drawLoop( time ) {
    // clear the background (x,y, W, H)
    canvasContext.clearRect(0,0, WIDTH, HEIGHT);
    
//number relating to the volume 
    var vol= meter.volume; 

//original radius of each circle
    // var c1 = 104; 
    // var c2 = 130;
    // var c3 = 150;
    // var c4 = 170;
    var c5 = 175;

//Intensity of shape expantion   
    var inten = 1000;


//Centre positions of canvas 
    var centreX = WIDTH*0.5;
    var centreY = HEIGHT*0.5;
    
//Logo Measurements to make square. Ensure logo.png is deffo transparent png and 500px x 500px or bigger 
    var logoW = 500;
    var logoH = 500;


    // check if we're currently clipping (stopping the volume number going fudging cray cray if it gets super loud)
     if (meter.checkClipping())
       canvasContext.strokeStyle = "white";
        
     else
       canvasContext.strokeStyle = "black";
    
    
//draw tweet text
    //var tweet=document.getElementById("tweet");
    //canvasContext.fillText(tweet, 0, 0, 800, 150); //(variable name, x pos, y pos, w, h)

    

    //set linewidth to draw with
    canvasContext.lineWidth=12+vol*-1;
    

//draw circle 1
   //  canvasContext.beginPath();
   //  canvasContext.arc(centreX, centreY, c1+vol*inten, vol*c1*10, c1+vol*c1*Math.PI); //(x centre pos, y centre pos, radius, start angle, end angle) full circle 0 2*Math.PI

   //  canvasContext.stroke();
   
   
    
   // //draw circle 2
   //  canvasContext.beginPath();
   //  canvasContext.arc(centreX, centreY, c2+vol*inten, vol*c2*10, c2+vol*c2*Math.PI); //(x centre pos, y centre pos, radius, start angle, end angle) full circle 0 2*Math.PI
   //  canvasContext.stroke();
    

   //  //draw circle 3
   //  canvasContext.beginPath();
   //  canvasContext.arc(centreX, centreY, c3+vol*inten, vol*c3*10, c3+vol*c3*Math.PI); //(x centre pos, y centre pos, radius, start angle, end angle) full circle 0 2*Math.PI
   //  canvasContext.stroke();


   //   //draw circle 4
   //  canvasContext.beginPath();
   //  canvasContext.arc(centreX, centreY, c4+vol*inten, vol*c4*10, c4+vol*c4*Math.PI); //(x centre pos, y centre pos, radius, start angle, end angle) full circle 0 2*Math.PI
   //  canvasContext.stroke();

     //draw circle 5
    canvasContext.beginPath();
    canvasContext.arc(centreX, centreY, c5+vol*inten, vol*c5*10, c5+vol*c5*Math.PI); //(x centre pos, y centre pos, radius, start angle, end angle) full circle 0 2*Math.PI
    canvasContext.stroke();
    

// If everythings fucked, use this to see if at least somethings working in the background, debug use only
    //console.log(meter.volume*100);
    //console.log(vol*c5*10);

// set up the next visual callback
    rafID = window.requestAnimationFrame( drawLoop );

//draw logo image
var img=document.getElementById("logo");
    canvasContext.drawImage(img, centreX-logoW*0.5, centreY-logoH*0.5, logoW, logoH); //(variable name, x pos, y pos, w, h)
}

//Volume Meter -----------------------------------------------------------------------------------------------------

function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
    var processor = audioContext.createScriptProcessor(512);
    processor.onaudioprocess = volumeAudioProcess;
    processor.clipping = false;
    processor.lastClip = 0;
    processor.volume = 0;
    processor.clipLevel = clipLevel || 0.98;
    processor.averaging = averaging || 0.95;
    processor.clipLag = clipLag || 750;

// this will have no effect, since we don't copy the input to the output,
// but works around a current Chrome bug.
    processor.connect(audioContext.destination);

    processor.checkClipping =
        function(){
            if (!this.clipping)
                return false;
            if ((this.lastClip + this.clipLag) < window.performance.now())
                this.clipping = false;
            return this.clipping;
        };

    processor.shutdown =
        function(){
            this.disconnect();
            this.onaudioprocess = null;
        };

    return processor;
}

function volumeAudioProcess( event ) {
    var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
    var sum = 0;
    var x;

    // Do a root-mean-square on the samples: sum up the squares...
    for (var i=0; i<bufLength; i++) {
        x = buf[i];
        if (Math.abs(x)>=this.clipLevel) {
            this.clipping = true;
            this.lastClip = window.performance.now();
        }
        sum += x * x;
    }

    // ... then take the square root of the sum.
    var rms =  Math.sqrt(sum / bufLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume*this.averaging);
}


//Tweet js--------//
$(document).ready(function(){
   new getMyTweets(); 
 });


function getMyTweets(){

	$.ajax({
		url: 'get_tweets.php',
		type: 'GET',
		success: function(response) {

			setTimeout(function(){getMyTweets();}, 60000); //how often refresh in milliseconds 10000=10sec 

			if (typeof response.errors === 'undefined' || response.errors.length < 1) {
				
				var $tweetsM = $('<ul style="list-style-type:none"> </ul> ');
				$.each(response, function(i, obj) {
					$tweetsM.append('<div> <li class="a"> <div class="tweet-title">Tweet us @RendezWinch </div> <p class="tweet">' + obj.text + ' </p> <p class="tweet"><img class="tweet-pic" src="' + obj.entities.media[0].media_url + '"></p> </li> 	</div>');
					
				});
				$('.tweets-container').html($tweetsM);

			} 

			else {

				
			
			}

			


		},
		error: function(errors) {
			$('.tweets-container p:first').text('Request error');
		}
	});
};



