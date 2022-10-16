// list of tracks
let trackListing = document.getElementsByClassName('track-link');

function addEventListenersToTrackLinks(trackListing) {
  const tracksArr = Array.prototype.slice.call(trackListing);
  tracksArr.forEach(link => {
    link.addEventListener('click', function() {
      // find an attribute that is searchable from the trackList
      const index = trackList.findIndex((track) => track.name === link.innerHTML);
      // hold the index of the tracklist
      // load track from the index
      loadTrack(index);
      playTrack();
    });
  });
}

// Select all the elements in the HTML page
// and assign them to a variable
let nowPlaying = document.querySelector(".now-playing");
let trackArt = document.querySelector(".track-art");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");

let playPauseBtn = document.querySelector(".play-pause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let seekSlider = document.querySelector(".seek-slider");
let currTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");
let volumeSlider = document.querySelector(".volume-slider");

// Specify globally used values
let trackIndex = 0;
let isPlaying = false;
let updateTimer;

let currTrack = document.createElement('audio');

// TODO: dynamically generate list based on fetch
let trackList = [
  {
    id: 1,
    name: "Scorpio Harvest",
    artist: "DJ Chai",
    image: "https://audio-app-pw.s3.amazonaws.com/scorpioharvest.jpg",
    path: "https://audio-app-pw.s3.amazonaws.com/Chai_ScorpioHarvest2015.mp3"
  },
  {
    name: "FnF Fall Classic",
    artist: "DJ Chai",
    image: "https://audio-app-pw.s3.amazonaws.com/flower.jpg",
    path: "https://audio-app-pw.s3.amazonaws.com/FnF_Fall_Classic.mp3"
  },
  {
    name: "Just Another Tuesday",
    artist: "DJ Chai",
    image: "https://audio-app-pw.s3.amazonaws.com/techno.jpg",
    path: "https://audio-app-pw.s3.amazonaws.com/Just_Tuesday.mp3",
  },
];

function loadTrack(trackIndex) {
  clearInterval(updateTimer);
  resetValues();

  // Loads a new track
  currTrack.src = trackList[trackIndex].path;
  currTrack.load();

  // Updates details of the track
  trackArt.style.backgroundImage = "url(" + trackList[trackIndex].image + ")";
  trackName.textContent = trackList[trackIndex].name;
  trackArtist.textContent = trackList[trackIndex].artist;
  nowPlaying.textContent = "PLAYING " + (trackIndex + 1) + " OF " + trackList.length;

  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);

  // Moves to the next track if the current finishes playing
  currTrack.addEventListener("ended", nextTrack);

  // Applies a random background color
  randomBGColor();
}

function randomBGColor() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  let color = "rbg(" + red + "," + green + "," + blue + ")";

  document.body.style.background = color;
}

function resetValues() {
  currTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
}

function playPauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  currTrack.play();
  isPlaying = true;

  playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}

function pauseTrack() {
  currTrack.pause();
  isPlaying = false;

  playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>'
}

function nextTrack() {
  // Go back to the first track if current one is the last in the list
  if (trackIndex < trackList.length -1) {
    trackIndex += 1;
  } else trackIndex = 0;

  loadTrack(trackIndex);
  playTrack();
}

function prevTrack() {
  if (trackIndex > 0) {
    trackIndex--;
  } else trackIndex = trackList.length -1;

  loadTrack(trackIndex);
  playTrack();
}

function seekTo() {
  currTrack.currentTime = currTrack.duration * (seekSlider.value / 100);;
}

function setVolume() {
  currTrack.volume = (volumeSlider.value / 100);
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(currTrack.duration)) {
    seekPosition = currTrack.currentTime * (100/currTrack.duration);
    seekSlider.value = seekPosition;

    let currMinutes = Math.floor(currTrack.currentTime / 60);
    let currSeconds = Math.floor(currTrack.currentTime - currMinutes * 60);
    let durationMinutes = Math.floor(currTrack.duration / 60);
    let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

    if (currSeconds < 10) { currSeconds = "0" + currSeconds };
    if (currMinutes < 10) { currMinutes = "0" + currMinutes };
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds };
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes };

    currTime.textContent = currMinutes + ":" + currSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;  
  }
}

// Load the first track in the tracklist
loadTrack(trackIndex);

window.onload = addEventListenersToTrackLinks(trackListing);
