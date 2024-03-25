const DisplayController = (function() {
    function updateMessage(message) {
        document.querySelector("#message").innerText = message;
    }

    return {
        updateMessage,
    };
})();

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

    function reset() {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }

        document.querySelectorAll(".game-tile").forEach((tile) => {
            tile.innerText = "";
        });
    }

    const getBoard = () => board;

    function update(i, mark) {
        const tile = document.querySelectorAll(".game-tile")[i];
        if (board[i] === "" && tile.innerText === "") {
            board[i] = mark;
            tile.innerText = mark;
        }
    }

    return {
        draw,
        reset,
        update,
        getBoard,
    };
})();

function createPlayer(name, mark) {
    return { name, mark };
}

const Game = (function() {
    const players = [];
    let currentPlayer;
    let gameOver;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function createPlayers(name1, name2) {
        players.push(createPlayer(name1, "X"));
        players.push(createPlayer(name2, "O"));
    }

    function start() {
        currentPlayer = 0;
        gameOver = false;
        GameBoard.draw();
        DisplayController.updateMessage(`${players[currentPlayer].name}'s turn`);
    }

    function restart() {
        currentPlayer = 0;
        gameOver = false;
        GameBoard.reset();
        DisplayController.updateMessage(`${players[currentPlayer].name}'s turn`);
    }

    function playRound(tileIndex) {
        if (gameOver) {
            return;
        }

        GameBoard.update(tileIndex, players[currentPlayer].mark);

        const gameStatus = checkGameStatus(GameBoard.getBoard());
        if (gameStatus === "draw") {
            gameOver = true;
            DisplayController.updateMessage("It's a draw!");
            return;
        } else if (gameStatus === "winner") {
            gameOver = true;
            DisplayController.updateMessage(
                `${players[currentPlayer].name} has won!`,
            );
            return;
        }

        currentPlayer = currentPlayer === 0 ? 1 : 0;
        DisplayController.updateMessage(`${players[currentPlayer].name}'s turn`);
    }

    function checkGameStatus(gameboard) {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (
                gameboard[a] &&
                gameboard[a] === gameboard[b] &&
                gameboard[a] === gameboard[c]
            ) {
                return "winner";
            }
        }
        if (gameboard.every((e) => e !== "")) {
            return "draw";
        }

        return "continue";
    }

    return {
        createPlayers,
        start,
        restart,
        playRound,
    };
})();

document
    .querySelector("#restart-button")
    .addEventListener("click", () => Game.restart());

const playerDialog = document.querySelector("#player-dialog");
window.addEventListener("load", () => {
    document.querySelector("#player1-name").value = "";
    document.querySelector("#player2-name").value = "";
    playerDialog.showModal();
});
const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.createPlayers(
        document.querySelector("#player1-name").value,
        document.querySelector("#player2-name").value,
    );

    Game.start();
});
