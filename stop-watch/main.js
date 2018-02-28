var $startButton = document.querySelector("#button__start");
var $hours = document.querySelector("#hours");
var $minutes = document.querySelector("#minutes");
var $seconds = document.querySelector("#seconds");

var timerSeconds = 0;
var isIntervalInProgress = false;

function interval() {
  timerSeconds++;
}

function displayTime(seconds) {
  var calcHours = Math.floor(seconds / 3600);
  var calcMin = Math.floor((seconds - calcHours * 3600) / 60);
  if (calcMin < 10) {
    calcMin = "0" + calcMin;
  }
  var calcSeconds = seconds - (calcHours * 3600 + calcMin * 60);
  if (calcSeconds < 10) {
    calcSeconds = "0" + calcSeconds;
  }
  var time = {
    hour: calcHours,
    min: calcMin,
    sec: calcSeconds
  };
  return time;
}

function watchDisplay($hour, $min, $sec) {
  $hour.textContent = displayTime(timerSeconds).hour;
  $min.textContent = displayTime(timerSeconds).min;
  $sec.textContent = displayTime(timerSeconds).sec;
}

$startButton.addEventListener("click", function() {
  if (isIntervalInProgress === false) {
    setInterval(function() {
      if (isIntervalInProgress === false) {
        isIntervalInProgress = true;
      }
      interval();
      watchDisplay($hours, $minutes, $seconds);
    }, 1000);
  }
});
