const songs = [
    { title: "Song: June Ponal", artist: "Artist: Krish", src: "song1.mp3", cover: "cover1.png" },
    { title: "Song: Manmadhane", artist: "Artist: Yuvan Shankar Raja", src: "song2.mp3", cover: "cover2.png" },
    { title: "Song: Uyire En Uyire", artist: "Artist: Yuvan Shankar Raja", src: "song3.mp3", cover: "cover3.png" },
];

let currentSongIndex = 0;

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progressContainer = document.querySelector('.progress-container');
const progress = document.getElementById('progress');
const playlist = document.getElementById('playlist');

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
}

function playSong() {
    audio.play();
    playButton.textContent = 'Pause';
}

function pauseSong() {
    audio.pause();
    playButton.textContent = 'Play';
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

playButton.addEventListener('click', () => {
    const isPlaying = audio.paused;
    if (isPlaying) {
        playSong();
    } else {
        pauseSong();
    }
});

prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
});

nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
});

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(songs[currentSongIndex]);
        playSong();
    });
    playlist.appendChild(li);
});

loadSong(songs[currentSongIndex]);
