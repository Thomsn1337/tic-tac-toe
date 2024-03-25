const GameBoard = (function() {
    const board = ["", "", "", "", "", "", "", "", ""];

    function draw() {
        const boardDiv = document.querySelector("#gameboard");
        for (let i = 0; i < board.length; i++) {
            const tile = document.createElement("div");
            tile.classList.add("game-tile");
            tile.id = `tile-${i}`;
            boardDiv.appendChild(tile);
        }
    }

    return {
        draw,
    };
})();

const Game = (function() {
    function start() {
        GameBoard.draw();
    }

    return {
        start,
    };
})();

Game.start();
