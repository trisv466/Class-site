// function myFunction() {
//     var x = document.getElementById("blackfade");
//     if (x.style.display === "block") {
//         x.style.display = "none";
//     } else {
//         x.style.display = "block";
//     }
// }


$(document).ready(function() {
  
  var i = 0, timeOut = 0;
  
  $('.close').on('mousedown touchstart', function(e) {
    $(this).addClass('active');
    timeOut = setInterval(function(){
      console.log(i++);
    }, 100);
  }).bind('mouseup mouseleave touchend', function() {
    $(this).removeClass('active');
    clearInterval(timeOut);
  });
  
});


$("#helpicon").click(function() {
  $('.transform').toggleClass('transform-active');
});

$("#helpicon").click(function() {
  $('.transformblack').toggleClass('transformblack-active');
});