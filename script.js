"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const score0El = document.querySelector("#score--0");
const current0El = document.querySelector("#current--0");
const score1El = document.querySelector("#score--1");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");

let scores, currentScore, activePlayer, playing;

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

function newGame() {
  scores = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  current0El.textContent = 0;
  score1El.textContent = 0;
  current1El.textContent = 0;

  diceEl.style.display = "none";
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
}

newGame();

function rollDice() {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.style.display = "block";
    diceEl.src = `./image/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
}

function holdDice() {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.style.display = "none";

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
}

btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", holdDice);
btnNew.addEventListener("click", newGame);
