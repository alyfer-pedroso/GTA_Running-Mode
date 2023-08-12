(() => {
    const game = document.querySelector(".game");
    const startMenu = document.querySelector(".startMenu");
    const startMenu__btn = document.querySelector(".startMenu__btn");
    const scene = document.querySelector(".scene");
    const player = document.querySelector(".player");
    const playerAnim = document.querySelector(".playerAnim");
    const floor = document.querySelector(".floor");
    const audioPlay = document.querySelector(".audioPlay");
    const soundTrack = document.querySelectorAll(".soundTrack audio");

    let startGame = false;
    startMenu.style.display = "block";
    scene.style.display = "none";

    let isStartGame = setInterval(() => {
        if (startGame) {
            Game();
            clearInterval(isStartGame);
        }
    }, 50);

    startMenu__btn.addEventListener("click", () => {
        startGame = true;
    });

    const Game = () => {
        startMenu.style.display = "none";
        scene.style.display = "block";

        // if (soundTrack[0].classList.contains("paused")) {
        //     soundTrack[0].play();
        //     audioPlay.classList.remove("fa-volume-xmark");
        //     audioPlay.classList.add("fa-volume-high");
        //     soundTrack[0].classList.remove("paused");
        // }

        let jump = false;
        const jumping = (el) => {
            if (el.key == " " || el.key == "w") {
                jump = true;
                soundTrack[1].play();
            } else if (el.pointerType == "touch" || el.pointerType == "mouse") {
                jump = true;
                soundTrack[1].play();
            }
        };

        const gamePhysics = setInterval(() => {
            let velocityY = -2;
            let playerPositionY = Number(getComputedStyle(player).bottom.replace("px", ""));
            let playerLastPositionY = playerPositionY;

            let playerCollider;
            let floorCollider;
            let playerWidth = player.offsetWidth;
            let playerHeight = player.offsetHeight;
            let floorHeight = floor.offsetHeight;
            let isPlayerCollidingFloor = false;

            //Colisão do player
            playerCollider = {
                x: player.offsetLeft - player.scrollLeft,
                y: player.offsetTop - player.scrollTop,
                width: playerWidth,
                height: playerHeight,
            };

            //Colisão do chão
            floorCollider = {
                y: floor.offsetTop - floor.scrollTop,
                height: floorHeight,
            };

            //Verificando se o player está colidindo com o chão
            if (playerCollider.y > floorCollider.y + floorCollider.height || playerCollider.y + playerCollider.height < floorCollider.y) {
                isPlayerCollidingFloor = false;
            } else {
                isPlayerCollidingFloor = true;
            }

            //Se o player colidir ou não com o chão
            if (isPlayerCollidingFloor == false && jump == false) {
                playerLastPositionY += velocityY;
                player.style.bottom = `${playerLastPositionY}px`;
                playerAnim.style.setProperty("animation", "jumpFall .2s steps(1) forwards");
                game.removeEventListener("pointerdown", jumping);
                document.removeEventListener("keypress", jumping);
                //
            } else if (isPlayerCollidingFloor == true && playerPositionY == 40) {
                player.style.bottom = `${playerLastPositionY}px`;
                playerAnim.style.setProperty("animation", "run 0.6s steps(8) infinite");
                game.addEventListener("pointerdown", jumping);
                document.addEventListener("keypress", jumping);

                if (jump) {
                    let a = setInterval(() => {
                        playerLastPositionY += 3;
                        player.style.bottom = `${playerLastPositionY}px`;

                        if (playerLastPositionY == 250) {
                            jump = false;
                            clearInterval(a);
                        }
                    });
                }
                //
            } else if (isPlayerCollidingFloor == false && jump == true) {
                playerAnim.style.setProperty("animation", "jump 0s steps(1) forwards");
                //
            } else {
                playerLastPositionY += velocityY;
                player.style.bottom = `${playerLastPositionY}px`;
                game.removeEventListener("pointerdown", jumping);
                document.removeEventListener("keypress", jumping);
            }

            console.log(isPlayerCollidingFloor);
        });
    };

    soundTrack[0].pause();
    audioPlay.addEventListener("click", () => {
        if (soundTrack[0].classList.contains("paused")) {
            soundTrack[0].play();
            audioPlay.classList.remove("fa-volume-xmark");
            audioPlay.classList.add("fa-volume-high");
            soundTrack[0].classList.remove("paused");
        } else {
            soundTrack[0].pause();
            audioPlay.classList.add("fa-volume-xmark");
            audioPlay.classList.remove("fa-volume-high");
            soundTrack[0].classList.add("paused");
        }
    });
})();
