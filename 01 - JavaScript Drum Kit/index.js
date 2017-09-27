// "tink.wav" (letter L/keyCode 76) doesn't work in firefox?
// this is all very overly abstracted but whatever

var keyDivs = document.querySelectorAll(".key");
var audioElements = document.querySelectorAll("audio");

function findElementByKeyCode(collection, keyCode) {
  var keyCodeStr = keyCode.toString();
  // using [].find.call makes it more generic even though this is just a baby example
  // (e.g. works on HTMLCollection, which lacks forEach(), find(), etc.)
  return [].find.call(collection, (element) => element.dataset.key === keyCodeStr);
}

function handleKeyDown(e) {
  var keyCode = e.keyCode;
  var keyDiv = findElementByKeyCode(keyDivs, keyCode);
  if (!keyDiv) return false;
  var audioElement = findElementByKeyCode(audioElements, keyCode);

  keyDiv.classList.add("playing");
  playAudio(audioElement);
}

function playAudio(audioElement) {
  audioElement.currentTime = 0;
  audioElement.play();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return false;
  e.target.classList.remove("playing");
}

document.body.addEventListener("keydown", handleKeyDown);
keyDivs.forEach(keyDiv => keyDiv.addEventListener("transitionend", removeTransition));

