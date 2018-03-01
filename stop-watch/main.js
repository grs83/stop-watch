var $startButton = document.querySelector("#button__start");
var $pauseButton = document.querySelector("#button__pause");
var $resetButton = document.querySelector("#button__reset");
var $timerHour = document.querySelector("#limit__set--hour");
var $timerMin = document.querySelector("#limit__set--min");
var $timerSec = document.querySelector("#limit__set--sec");
var $timerEnter = document.querySelector("#limit__set--enter");
var $hours = document.querySelector("#hours");
var $minutes = document.querySelector("#minutes");
var $seconds = document.querySelector("#seconds");
var $timerDisplay = document.querySelector(".display__time");

var timerSeconds = 0;
var timer = false;
var animation = false;

function interval() {
  timerSeconds++;
}

function intervalReverse() {
  timerSeconds--;
}

function displayTime(seconds) {
  var calcHours = Math.floor(seconds / 3600);
  if (calcHours < 10) {
    calcHours = "0" + calcHours;
  }
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

function toggleAnimationOn() {
  var $animate_ball_class = document.querySelectorAll(".animate");
  $animate_ball_class[0].classList.remove("animate__pause");
  $animate_ball_class[1].classList.remove("animate__pause");
  for (var i = 0; i < $animate_ball_class.length; i++) {
    if (isIntervalInProgress === true) {
      $animate_ball_class[i].classList.add("animate__on");
    }
  }
}

function toggleAnimationPause() {
  var $animate_ball_class = document.querySelectorAll(".animate");
  $animate_ball_class[2].classList.remove("animate__on");
  for (var i = 0; i < $animate_ball_class.length - 1; i++) {
    if (isIntervalInProgress === false) {
      $animate_ball_class[i].classList.add("animate__pause");
    }
  }
}

function toggleAnimationOff() {
  var $animate_ball_class = document.querySelectorAll(".animate");
  $animate_ball_class[0].classList.remove("animate__pause");
  $animate_ball_class[1].classList.remove("animate__pause");
  for (var i = 0; i < $animate_ball_class.length; i++) {
    if (isIntervalInProgress === false || timer === true) {
      $animate_ball_class[i].classList.remove("animate__on");
    }
  }
}

function toggleTimerDisplayOn() {
  $timerDisplay.classList.add("timer");
}

function toggleTimerDisplayOff() {
  $timerDisplay.classList.remove("timer");
}

var isIntervalInProgress = false;
var intervalID = null;

function initateInterval() {
  if (isIntervalInProgress === false) {
    isIntervalInProgress = true;
    intervalID = setInterval(function() {
      if (timer === false) {
        if (animation === false) {
          animation = true;
          toggleAnimationOn();
        }
        interval();
        watchDisplay($hours, $minutes, $seconds);
      } else {
        if (animation === true) {
          animation = false;
          toggleAnimationOff();
        }
        intervalReverse();
        watchDisplay($hours, $minutes, $seconds);
        if (timerSeconds < 1) {
          isIntervalInProgress = false;
          timer = false;
          timerSeconds = 0;
          watchDisplay($hours, $minutes, $seconds);
          toggleTimerDisplayOff();
          clearInterval(intervalID);
          alert("Your Timer Is Complete!");
        }
      }
    }, 1000);
  }
}

$startButton.addEventListener("click", function() {
  initateInterval();
});

$pauseButton.addEventListener("click", function() {
  isIntervalInProgress = false;
  toggleAnimationPause();
  animation = false;
  clearInterval(intervalID);
});

$resetButton.addEventListener("click", function() {
  isIntervalInProgress = false;
  timer = false;
  toggleAnimationOff();
  animation = false;
  timerSeconds = 0;
  watchDisplay($hours, $minutes, $seconds);
  toggleTimerDisplayOff();
  clearInterval(intervalID);
});

$timerEnter.addEventListener("click", function() {
  var timerHour = $timerHour.value * 3600;
  var timerMin = $timerMin.value * 60;
  var timerSec = $timerSec.value * 1;
  var timerTotal = timerHour + timerMin + timerSec;
  timer = true;
  timerSeconds = timerTotal;
  toggleAnimationOff();
  toggleTimerDisplayOn();
  watchDisplay($hours, $minutes, $seconds);
  $timerHour.value = "";
  $timerMin.value = "";
  $timerSec.value = "";
});
