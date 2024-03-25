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
        update,
        getBoard,
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

    function start() {
        currentPlayer = 0;
        gameOver = false;
        GameBoard.draw();
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
        } else if (gameStatus === "winner") {
            gameOver = true;
            DisplayController.updateMessage(
                `${players[currentPlayer].name} has won!`,
            );
        }

        currentPlayer = currentPlayer === 0 ? 1 : 0;
    }

    function checkGameStatus(gameboard) {
        if (gameboard.every((e) => e !== "")) {
            return "draw";
        }

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

        return "continue";
    }

    return {
        start,
        playRound,
    };
})();

Game.start();
