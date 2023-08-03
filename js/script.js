(() => {
    const game = document.querySelector(".game");
    const scene = document.querySelector(".scene");
    const player = document.querySelector(".player");
    const playerAnim = document.querySelector(".playerAnim");
    const audioPlay = document.querySelector(".audioPlay");
    const soundTrack = document.querySelector(".soundTrack audio");

    let jump = false;

    const jumping = (el) => {
        if (el.key == " " || el.key == "w") {
            playerAnim.style.setProperty("animation", "jump 0s steps(1) forwards");
            game.removeEventListener("pointerdown", jumping);
            document.removeEventListener("keypress", jumping);
            jump = true;
        } else {
            playerAnim.style.setProperty("animation", "jump 0s steps(1) forwards");
            game.removeEventListener("pointerdown", jumping);
            document.removeEventListener("keypress", jumping);
            jump = true;
        }
    };

    const gamePhysics = setInterval(() => {
        let velocityY = 0;
        let playerPositionY = Number(getComputedStyle(player).bottom.replace("px", ""));
        let playerLastPositionY = playerPositionY;

        if (playerPositionY > 40) {
            velocityY -= 2;
            playerLastPositionY += velocityY;
            player.style.bottom = `${playerLastPositionY}px`;
        } else {
            velocityY = 0;
            playerLastPositionY = 40;
            player.style.bottom = `${playerLastPositionY}px`;
        }

        if (jump && playerPositionY <= 200) {
            playerLastPositionY += 4;
            player.style.bottom = `${playerLastPositionY}px`;
        } else {
            jump = false;
            playerAnim.style.setProperty("animation", "jumpFall .2s steps(1) forwards");
            if (playerLastPositionY == 40) {
                playerAnim.style.setProperty("animation", "run 0.6s steps(8) infinite");
                game.addEventListener("pointerdown", jumping);
                document.addEventListener("keypress", jumping);
            }
        }

        velocityY = 0;
        velocityY -= 2;
    });

    soundTrack.pause();
    audioPlay.addEventListener("click", () => {
        if (soundTrack.classList.contains("paused")) {
            soundTrack.play();
            audioPlay.classList.remove("fa-volume-xmark");
            audioPlay.classList.add("fa-volume-high");
            soundTrack.classList.remove("paused");
        } else {
            soundTrack.pause();
            audioPlay.classList.add("fa-volume-xmark");
            audioPlay.classList.remove("fa-volume-high");
            soundTrack.classList.add("paused");
        }
    });

    game.addEventListener("pointerdown", jumping);
    document.addEventListener("keypress", jumping);
})();
