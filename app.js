// /*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const resetBtnEl = document.querySelector("#reset");
// /*---------------------------- Variables (state) ----------------------------*/

let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let winner = false;
let tie = true;

/*------------------------ Cached Element References ------------------------*/

/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = true;
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((cell, i) => {
    return (squareEls[i].innerText = cell);
  });
}

function updateMessage() {
  if (winner === false && tie === false) {
    messageEl.innerText = "Your turn!";
  } else if ((winner === false) & (tie === true)) {
    messageEl.innerText = "It's a tie!";
  } else {
    messageEl.innerText = "You have won!";
  }
}

function handleClick(event) {
  let squareIndex = event.target.id;
  if (board[squareIndex] !== "" || winner === true) {
    return;
  }
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

function placePiece(index) {
  board[index] = turn;
}

function checkForWinner() {
  winningCombos.forEach((combo) => {
    const [a, b, c] = combo;
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      winner = true;
    }
  });
}

const empty = (cell) => (cell = "");

function checkForTie() {
  if (winner === true) {
    return;
  }
  if (board.some(empty)) {
    tie = false;
  } else {
    tie = true;
  }
}

function switchPlayerTurn() {
  if (winner === true) {
    return;
  }
  if (winner === false) {
    if (turn === "X") {
      turn = "O";
      console.log(turn);
    } else {
      turn = "X";
      console.log(turn);
    }
  }
}

/*----------------------------- Event Listeners -----------------------------*/

document.querySelector(".board").addEventListener("click", handleClick);
resetBtnEl.addEventListener("click", init);
