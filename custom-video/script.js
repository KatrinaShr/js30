const rootVariablesCss = getComputedStyle(document.documentElement);
const accentColorLight = rootVariablesCss.getPropertyValue('--accent-color-light');
const additionalLightColor = rootVariablesCss.getPropertyValue('--additional-light-color');

const playerEl = document.querySelector('.player');
const videoEl = document.querySelector('.viewer');

const btnVideoPlayEl = playerEl.querySelector('.video-play');
const btnPlayEl = playerEl.querySelector('.btn-play');
const btnPauseEl = playerEl.querySelector('.btn-pause');
const btnVolumeEl = playerEl.querySelector('.btn-volume');
const btnMuteEl = playerEl.querySelector('.btn-mute');

const progressVideoEl = document.querySelector('.progress-video');
const progressSpeedEl = document.querySelector('.progress-speed');
const progressVolumeEl = document.querySelector('.progress-volume');

const titleSpeedEl = document.querySelector('.title-speed');
const controlsEl = document.querySelector('.controls');
let currentVideoDuration = 0;

document.addEventListener("DOMContentLoaded", init());

function init() {
  videoEl.volume = 0.5;
  progressVolumeEl.value = videoEl.volume * 100;

  updateProgressBar(progressSpeedEl);
  updateProgressBar(progressVolumeEl);
  updateProgressBar(progressVideoEl);

  videoEl.addEventListener('loadedmetadata', () => {
    currentVideoDuration = videoEl.duration;
  });
}

function togglePlay() {
  videoEl.paused ? playVideo() : stopVideo();
}

function playVideo() {
  videoEl.play();
  btnVideoPlayEl.classList.add('hidden');
  btnPlayEl.classList.add('hidden');
  btnPauseEl.classList.remove('hidden');
}

function stopVideo() {
  videoEl.pause();
  btnVideoPlayEl.classList.remove('hidden');
  btnPlayEl.classList.remove('hidden');
  btnPauseEl.classList.add('hidden');
}

videoEl.addEventListener('click', togglePlay);
btnVideoPlayEl.addEventListener('click', togglePlay);
btnPlayEl.addEventListener('click', togglePlay);
btnPauseEl.addEventListener('click', togglePlay);

btnVolumeEl.addEventListener('click', () => {
  btnVolumeEl.classList.add('hidden');
  btnMuteEl.classList.remove('hidden');
  videoEl.volume = 0;
  progressVolumeEl.value = 0;
  updateProgressBar(progressVolumeEl);
});

btnMuteEl.addEventListener('click', () => {
  btnVolumeEl.classList.remove('hidden');
  btnMuteEl.classList.add('hidden');
  videoEl.volume = 0.5;
  progressVolumeEl.value = 100;
  updateProgressBar(progressVolumeEl);
});

progressSpeedEl.addEventListener('input', function() {
  videoEl.playbackRate = this.value;
  updateProgressBar(this);
  titleSpeedEl.innerHTML = `${this.value}x`;
});

progressVolumeEl.addEventListener('input', function() {
  videoEl.volume = this.value / 100;
  updateProgressBar(this);
});

progressVideoEl.addEventListener('input', function() {
  const time = (this.value / 100) * currentVideoDuration;
  videoEl.currentTime = time;
});

videoEl.addEventListener('timeupdate', updateProgressVideo);
videoEl.addEventListener('ended', () => {
  btnVideoPlayEl.classList.remove('hidden');
  btnPlayEl.classList.remove('hidden');
  btnPauseEl.classList.add('hidden');
});

function updateProgressVideo() {
  if (videoEl.currentTime > 0) {
    const value = Math.floor((videoEl.currentTime / videoEl.duration) * 100);

    progressVideoEl.value = value;
    progressVideoEl.style.background = `linear-gradient(to right, ${accentColorLight} 0%, ${accentColorLight} ${value}%, ${additionalLightColor} ${value}%, ${additionalLightColor} 100%)`;
  }
}

function updateProgressBar(obj) {
  const value = obj.value;
  const max = obj.max || 100;
  const percent = (value / max) * 100;
  obj.style.background = `linear-gradient(to right, ${accentColorLight} 0%, ${accentColorLight} ${percent}%, ${additionalLightColor} ${percent}%, ${additionalLightColor} 100%)`;
}