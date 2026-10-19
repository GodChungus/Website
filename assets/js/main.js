(() => {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {
        const entrance = document.getElementById("entrance");
        const music = document.getElementById("music");
        const musicPlayer = document.getElementById("music-player");
        const musicArt = document.getElementById("music-art");
        const musicTitle = document.getElementById("music-title");
        const musicArtist = document.getElementById("music-artist");
        const musicToggle = document.getElementById("music-toggle");

        const firstName = document.querySelector(".name-first");
        const lastName = document.querySelector(".name-last");
        const cursor = document.querySelector(".cursor");

        const songs = [
            {
                title: "Memento",
                artist: "nonoc",
                src: "./music/memento.mp3",
                art: "./images/memento.jpg"
            },
            {
                title: "Ender Ember",
                artist: "Unknown",
                src: "./music/ender_ember.mp3",
                art: "./images/memento.jpg"
            },
            {
                title: "Stay Alive",
                artist: "Unknown",
                src: "./music/stay_alive.mp3",
                art: "./images/memento.jpg"
            }
        ];

        let selectedSong = null;
        let entered = false;
        let typingTimer = null;

        function setPlayButton(playing) {
            if (!musicToggle) return;

            musicToggle.innerHTML = playing
                ? '<span class="pause-icon"><span></span><span></span></span>'
                : '<span class="play-icon"></span>';

            musicToggle.setAttribute(
                "aria-label",
                playing ? "Pause music" : "Play music"
            );
        }

        function typeName() {
            if (!firstName || !lastName) return;

            const first = "Prakrit";
            const last = " Gajurel";
            const fullName = first + last;

            let index = 0;

            firstName.textContent = "";
            lastName.textContent = "";

            if (typingTimer !== null) {
                clearInterval(typingTimer);
            }

            typingTimer = setInterval(() => {
                if (index < first.length) {
                    firstName.textContent += fullName[index];
                } else if (index < fullName.length) {
                    lastName.textContent += fullName[index];
                } else {
                    clearInterval(typingTimer);
                    typingTimer = null;

                    if (cursor) {
                        cursor.style.animation = "none";
                        cursor.style.opacity = "1";
                    }

                    return;
                }

                index++;
            }, 110);
        }

        function chooseSong() {
            if (!music || !musicPlayer) return;

            selectedSong =
                songs[Math.floor(Math.random() * songs.length)];

            musicPlayer.classList.remove("hidden");

            if (musicTitle) {
                musicTitle.textContent = selectedSong.title;
            }

            if (musicArtist) {
                musicArtist.textContent = selectedSong.artist;
            }

            if (musicArt) {
                musicArt.src = selectedSong.art;
                musicArt.onerror = () => {
                    console.error("Album artwork failed:", musicArt.src);
                };
            }

            music.src = selectedSong.src;
            music.volume = 0.1;
            music.load();

            setPlayButton(false);
        }

        async function startMusic() {
            if (!music) return;

            if (!selectedSong) {
                chooseSong();
            }

            try {
                await music.play();
            } catch (error) {
                setPlayButton(false);
                console.error("Music playback failed:", error);
            }
        }

        function enterSite() {
            if (entered) return;
            entered = true;

            if (entrance) {
                entrance.classList.add("leaving");
                entrance.setAttribute("aria-hidden", "true");
            }

            document.body.classList.remove("no-scroll");

            typeName();
            chooseSong();

            // Playback is initiated from the user's click.
            startMusic();
        }

        if (entrance) {
            entrance.addEventListener("click", enterSite);

            entrance.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    enterSite();
                }
            });
        }

        if (musicToggle && music) {
            musicToggle.addEventListener("click", async () => {
                if (music.paused) {
                    await startMusic();
                } else {
                    music.pause();
                }
            });
        }

        if (music) {
            music.addEventListener("play", () => {
                setPlayButton(true);
            });

            music.addEventListener("pause", () => {
                setPlayButton(false);
            });

            music.addEventListener("ended", () => {
                setPlayButton(false);
            });

            music.addEventListener("error", () => {
                console.error(
                    "Audio file failed to load:",
                    music.currentSrc || music.src,
                    music.error
                );

                setPlayButton(false);
            });
        }

        setPlayButton(false);
    });
})();
