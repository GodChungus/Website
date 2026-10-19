const entrance = document.getElementById("entrance");
const music = document.getElementById("music");
const musicPlayer = document.getElementById("music-player");
const musicToggle = document.getElementById("music-toggle");

const nameFirst = document.querySelector(".name-first");
const nameLast = document.querySelector(".name-last");

const musicArt = document.getElementById("music-art");
const musicTitle = document.getElementById("music-title");
const musicArtist = document.getElementById("music-artist");

music.volume = 0.1;

/* songs */

const songs = [
    {
        title: "Memento",
        artist: "nonoc",
        src: "./music/memento.mp3",
        image: "./images/memento.jpg"
    },
    {
        title: "Ender Ember",
        artist: "MYTH & ROID, TK from Ling tosite sigure",
        src: "./music/ender_ember.mp3",
        image: "./images/ender_ember.png"
    },
    {
        title: "Stay Alive",
        artist: "Rie Takahashi",
        src: "./music/stay_alive.mp3",
        image: "./images/stay_alive.png"
    }
];

/* choose a random song */

const selectedSong = songs[Math.floor(Math.random() * songs.length)];

/* update music player */

music.src = selectedSong.src;

musicArt.src = selectedSong.image;
musicArt.alt = selectedSong.title + " artwork";

musicTitle.textContent = selectedSong.title;
musicArtist.textContent = selectedSong.artist;

/* icons */

const pauseIcon = `
    <span class="pause-icon">
        <span></span>
        <span></span>
    </span>
`;

const playIcon = `
    <span class="play-icon"></span>
`;

musicToggle.innerHTML = pauseIcon;

/* typing animation */

function typeName() {
    const firstName = "Prakrit";
    const lastName = " Gajurel";

    let firstIndex = 0;
    let lastIndex = 0;

    function typeFirst() {
        if (firstIndex < firstName.length) {
            nameFirst.textContent += firstName[firstIndex];
            firstIndex++;
            setTimeout(typeFirst, 200);
        } else {
            setTimeout(typeLast, 200);
        }
    }

    function typeLast() {
        if (lastIndex < lastName.length) {
            nameLast.textContent += lastName[lastIndex];
            lastIndex++;
            setTimeout(typeLast, 100);
        }
    }

    typeFirst();
}

/* click to enter */

entrance.addEventListener("click", function () {
    entrance.classList.add("leaving");
    musicPlayer.classList.remove("hidden");

    typeName();

    music.play()
        .then(function () {
            musicPlayer.classList.add("playing");
            musicToggle.innerHTML = pauseIcon;
        })
        .catch(function (error) {
            console.error(
                "Could not play " + selectedSong.title + ":",
                error
            );
        });
});

/* play / pause */

musicToggle.addEventListener("click", function () {
    if (music.paused) {
        music.play()
            .then(function () {
                musicPlayer.classList.add("playing");
                musicToggle.innerHTML = pauseIcon;
            })
            .catch(function (error) {
                console.error("Could not play music:", error);
            });
    } else {
        music.pause();
    }
});

/* music events */

music.addEventListener("play", function () {
    musicPlayer.classList.add("playing");
    musicToggle.innerHTML = pauseIcon;
});

music.addEventListener("pause", function () {
    musicPlayer.classList.remove("playing");
    musicToggle.innerHTML = playIcon;
});

music.addEventListener("ended", function () {
    musicPlayer.classList.remove("playing");
    musicToggle.innerHTML = playIcon;
});
