function playSound (event) {
  const audio = document.querySelector(`audio[data-key = "${event.keyCode}"]`);
  const key = document.querySelector(`div[data-key = "${event.keyCode}"]`);
  if(!audio) return;
  audio.currentTime = 0; // rewind to the start so can hit multiple times
  audio.play();
  key.classList.add("instrument-yellow");
 };

function removeTransition (event) {
  if (event.propertyName !== "transform") return;
  this.classList.remove("instrument-yellow");
};

const instruments = document.querySelectorAll(".instrument");
instruments.forEach(instrument => instrument.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playSound);
