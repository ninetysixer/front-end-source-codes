// Define your playlist link and API key
var playlistLink = "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID";
var apiKey = "YOUR_API_KEY";


var playlist = [];
var currentIndex = 0;
var player;

// Fetch the playlist data using YouTube Data API
function fetchPlaylistData() {
  var playlistId = playlistLink.split("list=")[1];
  var playlistApiUrl = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + playlistId + "&key=" + apiKey;

  fetch(playlistApiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      data.items.forEach(function(item) {
        playlist.push(item.snippet.resourceId.videoId);
      });

      initAudioPlayer();
    })
    .catch(function(error) {
      console.log("Error fetching playlist data:", error);
    });
}

// Initialize the audio player
function initAudioPlayer() {
  player = new YT.Player("player", {
    height: "100%",
    width: "100%",
    videoId: playlist[currentIndex],
    playerVars: {
      autoplay: 0,
      controls: 1,
      disablekb: 1,
      enablejsapi: 1,
      fs: 0,
      iv_load_policy: 3,
      loop: 0,
      modestbranding: 1,
      rel: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

// Handle player ready event
function onPlayerReady(event) {
  // Autoplay the first video
  event.target.playVideo();
}

// Handle player state change event
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    // Play the next song when the current song ends
    nextSong();
  }
}

// Play the current song
function playCurrentSong() {
  player.loadVideoById(playlist[currentIndex]);
}

// Play or pause the current song
function togglePlayPause() {
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

// Play the previous song in the playlist
function previousSong() {
  if (currentIndex > 0) {
    currentIndex--;
    playCurrentSong();
  }
}

// Play the next song in the playlist
function nextSong() {
  if (currentIndex < playlist.length - 1) {
    currentIndex++;
    playCurrentSong();
  }
}

// Load the YouTube IFrame API, fetch playlist data, and initialize the player
fetchPlaylistData();

// Attach event listeners to the buttons
document.getElementById("play-pause-btn").addEventListener("click", togglePlayPause);
document.getElementById("previous-btn").addEventListener("click", previousSong);
document.getElementById("next-btn").addEventListener("click", nextSong);
