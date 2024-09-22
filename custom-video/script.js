const rootVariablesCss = getComputedStyle(document.documentElement);
const accentColorLight = rootVariablesCss.getPropertyValue('--accent-color-light');
const additionalLightColor = rootVariablesCss.getPropertyValue('--additional-light-color');

const playerEl = document.querySelector('.player');
const videoEl = document.querySelector('.viewer');
// const progress = playerEl.querySelector('.progress');
// const progressBarEl = playerEl.querySelector('.progress__filled');

const btnVideoPlayEl = playerEl.querySelector('.video-play');
const btnPlayEl = playerEl.querySelector('.btn-play');
const btnPauseEl = playerEl.querySelector('.btn-pause');
const btnVolumeEl = playerEl.querySelector('.btn-volume');

const progressVideoEl = document.querySelector('.progress-video');
const progressSpeedEl = document.querySelector('.progress-speed');
const progressVolumeEl = document.querySelector('.progress-volume');

const titleSpeedEl = document.querySelector('.title-speed');

const video = {
  isMute: false,
  currentTime: 0,
};

function togglePlay() {
  if (videoEl.paused) {
    videoEl.play();
    btnVideoPlayEl.classList.add('hidden');
    btnPlayEl.classList.add('hidden');

    btnPauseEl.classList.remove('hidden');
  } else {
    videoEl.pause();
    btnVideoPlayEl.classList.remove('hidden');
    btnPlayEl.classList.remove('hidden');

    btnPauseEl.classList.add('hidden');
  }
}

videoEl.addEventListener('click', () => {
  togglePlay();
});

btnVideoPlayEl.addEventListener('click', () => {
  togglePlay();
});

btnPlayEl.addEventListener('click', () => {
  togglePlay();
});

btnPauseEl.addEventListener('click', () => {
  togglePlay();
});
  
btnVolumeEl.addEventListener('click', () => {
  video.isMute ? video.isMute = false : video.isMute = true;
});

progressVideoEl.addEventListener('input', function() {
  updateProgressBar(this);
});

progressSpeedEl.addEventListener('input', function() {
  updateProgressBar(this);
  titleSpeedEl.innerHTML = `${this.value}x`;
});

progressVolumeEl.addEventListener('input', function() {
  updateProgressBar(this);
});

function updateProgressBar(obj) {
  const value = obj.value;
  const max = obj.max || 100;
  const percentage = (value / max) * 100;
  obj.style.background = `linear-gradient(to right, ${accentColorLight} 0%, ${accentColorLight} ${percentage}%, ${additionalLightColor} ${percentage}%, ${additionalLightColor} 100%)`;
}

// function updateBtnVolume(obj) {
//   const value = obj.value;
//   obj.style.background = `linear-gradient(to right, ${accentColorLight} 0%, ${accentColorLight} ${value}%, ${additionalLightColor} ${value}%, ${additionalLightColor} 100%)`;
// }

document.addEventListener("DOMContentLoaded", function() {
  updateProgressBar(progressVideoEl);
  updateProgressBar(progressSpeedEl);
  updateProgressBar(progressVolumeEl);
});