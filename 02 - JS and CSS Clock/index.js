var hourHand = document.querySelector('.hour-hand');
var minuteHand = document.querySelector('.minute-hand');
var secondHand = document.querySelector('.second-hand');

function updateClock() {
  var date = new Date();
  var [hours, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];

  // TODO: smooth transitions when rolling over back to 90deg
  var hourDegrees = hoursToDegrees(hours);
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;

  var minuteDegrees = minutesOrSecondsToDegrees(minutes);
  minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;

  var secondDegrees = minutesOrSecondsToDegrees(seconds);
  secondHand.style.transform = `rotate(${secondDegrees}deg)`;
}

// these are superfluous! ahhh! but I don't like those magic numbers
function minutesOrSecondsToDegrees(time) {
  return time / 60 * 360 + 90;
}

function hoursToDegrees(hours) {
  // 24 hour time!
  return hours % 12 / 12 * 360 + 90;
}

updateClock();
window.setInterval(updateClock, 1000);
