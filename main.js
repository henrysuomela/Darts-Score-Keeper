const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);

const submitScoreButton = document.getElementById("submitScoreButton");
submitScoreButton.addEventListener("click", throwDart);

submitScoreButton.disabled = true;

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

let player1, player2;
let winningLegs;
let currentPlayer;
let throwsThisTurn;
let gameType;
let scoreBeforeThisTurn;

const turnMessage = document.getElementById("turnMessage");
const scoreForThrowMessage = document.getElementById("scoreForThrowMessage");
const gameOverMessage = document.getElementById("gameOverMessage");
const legOverMessage = document.getElementById("legOverMessage");


function startGame() {

    scoreForThrowMessage.textContent = gameOverMessage.textContent = legOverMessage.textContent = "";

    const player1Name = document.getElementById("player1Name").value;
    const player2Name = document.getElementById("player2Name").value;

    player1 = addPlayer(player1Name || "Player 1");
    player2 = addPlayer(player2Name || "Player 2");

    gameType = parseInt(document.getElementById("gameType").value);

    const setSize = parseInt(document.getElementById("setSize").value);
    const setSizeErrorMessage = document.getElementById("setSizeErrorMessage");
    const winningLegsMessage = document.getElementById("winningLegsMessage");
    if (setSize % 2 === 0 || isNaN(setSize)) {
        setSizeErrorMessage.textContent = "Set size must be an odd number.";
        return;
    }
    else {
        setSizeErrorMessage.textContent = "";
        winningLegs = setSize / 2 + 0.5;
        winningLegsMessage.textContent = "Legs required to win: " + winningLegs;
    }

    player1.points = player2.points = gameType;
    updateScoreboard(player1, player2);

    currentPlayer = player1;
    throwsThisTurn = 0;
    turnMessage.textContent = "Current turn: " + currentPlayer.name + ", throws: " + throwsThisTurn;

    submitScoreButton.disabled = false;

}




function throwDart() {

    const scoreErrorMsg = document.getElementById("scoreInputErrorMessage")

    if (legOverMessage.textContent) {
        legOverMessage.textContent = "";
    }

    const possiblePoints = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 38, 39, 40,
        42, 45, 48, 50, 51, 54, 57, 60
    ];

    const points = parseInt(document.getElementById("scoreInput").value);
    if (isNaN(points)) {
        scoreErrorMsg.textContent = "Enter a number.";
        scoreForThrowMessage.textContent = "";
        return;
    }
    else if (!possiblePoints.includes(points)) {
        scoreErrorMsg.textContent = points + " isn't a valid score for a throw.";
        scoreForThrowMessage.textContent = "";
        return;
    }
    else {
        scoreErrorMsg.textContent = "";
    }

    if (throwsThisTurn === 0) {
        scoreBeforeThisTurn = currentPlayer.points;
    }
    
    currentPlayer.points -= points;

    if (currentPlayer.points < 0 || currentPlayer.points === 1) {
        currentPlayer.points = scoreBeforeThisTurn;
        scoreForThrowMessage.textContent = currentPlayer.name + " busts, score reverts to " + scoreBeforeThisTurn + " and turn ends.";
        updateScoreboard(player1, player2);

        throwsThisTurn = 0;
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        turnMessage.textContent = "Current turn: " + currentPlayer.name + ", throws: " + throwsThisTurn;
        return;
    }

    scoreForThrowMessage.textContent = currentPlayer.name + " scores " + points;

    if (currentPlayer.points === 0) {
        currentPlayer.legsWon += 1;
        updateScoreboard(player1, player2);

        if (currentPlayer.legsWon === winningLegs) {
            gameOverMessage.textContent = currentPlayer.name + " wins the game with " + currentPlayer.legsWon + " leg wins!";
            submitScoreButton.disabled = true;
            return;
        }
        else {
            player1.points = player2.points = gameType;
            legOverMessage.textContent = currentPlayer.name + " wins this leg!";
            throwsThisTurn = 0;

            currentPlayer = (currentPlayer === player1) ? player2 : player1;
            turnMessage.textContent = "Current turn: " + currentPlayer.name + ", throws: " + throwsThisTurn;
            updateScoreboard(player1, player2);
            return;
        }
    }

    updateScoreboard(player1, player2);

    throwsThisTurn += 1;
    turnMessage.textContent = "Current turn: " + currentPlayer.name  + ", throws: " + throwsThisTurn;

    if (throwsThisTurn === 3) {
        throwsThisTurn = 0;
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        turnMessage.textContent = "Current turn: " + currentPlayer.name  + ", throws: " + throwsThisTurn;
    }


}