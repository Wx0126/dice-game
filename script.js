'use strict';
//selecting elements:
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.querySelector('#current--0');

//starting conditions:
let scores;
let currentScore;
let activePlayer;
let playing;
const init = function () {
  // in this delcare, u cant let score = [0,0]  , because we already declare them before
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
};
init();
const switchPlayer = function () {
  //switch to the other player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle will remove the player--active class name if it has, will add the player--active classname if it dont have:
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');

  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.add('player--active');
  currentScore = 0;
};

//rolling dice functionalities:
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generate a random number from 1 to 6:
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display the dice:
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.check if the dice is 1:
    if (dice !== 1) {
      //add the dice to the current:
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`) // when using querySelector('.') dont miss the .classname
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector('.dice').classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
