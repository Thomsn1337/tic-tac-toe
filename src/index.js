const GameBoard = (function() {
    const board = ["", "", "", "", "", "", "", "", ""];

    function draw() {
        const boardDiv = document.querySelector("#gameboard");
        for (let i = 0; i < board.length; i++) {
            const tile = document.createElement("div");
            tile.classList.add("game-tile");
            tile.id = `tile-${i}`;

            tile.addEventListener("click", () => {
                Game.playRound(i);
            });

            boardDiv.appendChild(tile);
        }
    }

    function update(i, mark) {
        const tile = document.querySelectorAll(".game-tile")[i];
        if (board[i] === "" && tile.innerText === "") {
            board[i] = mark;
            tile.innerText = mark;
        }
    }

    return {
        draw,
        update,
    };
})();

function createPlayer(name, mark) {
    return { name, mark };
}

const Game = (function() {
    const players = [
        createPlayer("Player 1", "X"),
        createPlayer("Player 2", "O"),
    ];
    let currentPlayer;

    function start() {
        currentPlayer = 0;
        GameBoard.draw();
    }

    function playRound(tileIndex) {
        GameBoard.update(tileIndex, players[currentPlayer].mark);
        currentPlayer = currentPlayer === 0 ? 1 : 0;
    }

    return {
        start,
        playRound,
    };
})();

Game.start();
