(() => {
    const player = document.querySelector(".player");
    const playerRun = document.querySelector(".manRun");
    const pipe = document.querySelector(".pipe");

    const jump = () => {
        player.classList.add("jump");
        setTimeout(() => {
            player.classList.remove("jump");
        }, 750);
    };

    const loopInGame = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const playerPosition = Number(window.getComputedStyle(player).bottom.replace("px", ""));

        // if (pipePosition <= 80 && pipePosition > 0 && playerPosition < 80) {
        //     pipe.style.animation = "none";
        //     pipe.style.left = `${pipePosition}px`;

        //     playerRun.style.animation = "none";
        //     player.style.bottom = `${playerPosition}px`;

        //     document.removeEventListener("keyup", jump);
        //     document.removeEventListener("pointerdown", jump);

        //     clearInterval(loopInGame);
        // }
    }, 10);

    document.addEventListener("keyup", jump);
    document.addEventListener("pointerdown", jump);
})();
