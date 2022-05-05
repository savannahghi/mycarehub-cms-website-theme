const audio = document.querySelector("audio");
let audioProgress = document.querySelector(".progress");
let progressBar = document.querySelector(".progress-bar");
const playButton = document.querySelector(".play-btn");
let audioLength = document.getElementById("audio-length");

const playAudio = () => {
	audio.play();
};

const pauseAudio = () => {
	audio.pause();
};

const togglePlayPauseSong = () => {
	playButton.classList.toggle("paused");

	if (audio.duration > 0 && !audio.paused) {
		pauseAudio();
	} else {
		playAudio();
	}
};

const updateProgressBar = () => {
	const { duration, currentTime } = audio;
	const percentDuration = (currentTime / duration) * 100;
	audioProgress.style.width = `${percentDuration}%`;
};

const setAudioLength = () => {
	let duration = audio.duration;
	let hours = Math.floor(duration / 3600);
	duration %= 3600;
	let minutes = Math.floor(duration / 60);
	let seconds = Math.floor(duration % 60);

	let time = null;
	if (hours === 0) {
		time = `${minutes}:${seconds}`;
	} else {
		time = `${hours}:${minutes}:${seconds}`;
	}

	audioLength.innerHTML = time;
};

const setProgress = (e) => {
	const width = progressBar.clientWidth;
	const clickX = e.offsetX;
	const { duration } = audio;
	audio.currentTime = (clickX / width) * duration;
};

const reset = () => {
	playButton.classList.remove("paused");
	audioProgress.style.width = `0%`;
};

// listen for clicks on the play button
playButton.addEventListener("click", togglePlayPauseSong);

// listen for the audio playing
audio.addEventListener("timeupdate", updateProgressBar);
audio.addEventListener("ended", reset);

// listen for when the audio has loaded
audio.addEventListener("loadedmetadata", setAudioLength);

// listen for clicks on the progress bar
progressBar.addEventListener("click", setProgress);
