const player1Name = document.getElementById("player1Name").value;
const player2Name = document.getElementById("player2Name").value;
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", startGame);

function addPlayer(name) {

    return {
        name,
        points: 0,
        legsWon: 0
    }

}

function updateScoreboard(player1, player2) {

    document.querySelector("#player1 h2").textContent = player1.name + ":";
    document.querySelector("#player2 h2").textContent = player2.name + ":";
    document.querySelector("#player1Points").textContent = player1.points;
    document.querySelector("#player2Points").textContent = player2.points;
    document.querySelector("#player1Legs").textContent = player1.legsWon;
    document.querySelector("#player2Legs").textContent = player2.legsWon;

}

function startGame() {

    const player1 = addPlayer(player1Name || "Player 1");
    const player2 = addPlayer(player2Name || "Player 2");

    const gameType = parseInt(document.getElementById("gameType").value);
    player1.points = player2.points = gameType;
    updateScoreboard(player1, player2);

}


