'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
// Starting Conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// Call the init function
init();
// Create a a switch functionality
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Dice roll functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a randome dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // console.log(dice);
    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      currentScore0El.textContent = currentScore; // CHANGE LATER
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Add event handler to hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player scores
    scores[activePlayer] += currentScore;
    // console.log(scores[activePlayer]);
    // 2. Display the scores
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 4. Check for a winner
    if (scores[activePlayer] >= 20) {
      // finish the game
      playing = false;
      // Remove the dice after player wins
      diceEl.classList.add('hidden');
      // 5. Display the winner by adding a class player--winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // 6. remove the active player from the list of active players
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch to next player
      switchPlayer();
    }
  }
});

// Create a new game functionality
btnNew.addEventListener('click', init); // javaScript will call the init function
