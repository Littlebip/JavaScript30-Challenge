// define the selectors
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressField = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const ranges = player.querySelectorAll("[type='range']");
const skippers = player.querySelectorAll('[data-skip]');

// define the functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.innerText = (video.paused ? "►" : "❚ ❚");
}

function skip() {
  // console.log(`${this.dataset.skip} seconds to skip`);
  video.currentTime += parseFloat(this.dataset.skip);
}

function updateRange() {
  video[this.name] = this.value;
}

function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressField.style.flexBasis = `${percent}%`
}

function updateCurrentTime(event) {
  let newTime = event.offsetX / 640 * video.duration;
  video.currentTime = newTime;
}

// hook the functions to events
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
toggle.addEventListener("click", togglePlay);

skippers.forEach((skipper) => {
  skipper.addEventListener("click", skip);
});

ranges.forEach((range) => {
  range.addEventListener("change", updateRange)
});

video.addEventListener("timeupdate", updateProgress);
progress.addEventListener("click", updateCurrentTime);

let mousedown = false;
progress.addEventListener("mousemove", (event) => mousedown && updateCurrentTime(event));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
