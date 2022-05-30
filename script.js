'use strict';

//elements of dom
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// start conditions

let scores = [0, 0];
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayers = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//here are the delarations of audio functions
const winAudio = () => {
  const audio = new Audio('./sounds/win-sound.mp3');
  audio.play();
};
const newGameAudio = () => {
  const audio = new Audio('./sounds/newgame-sound.wav');
  audio.play();
};

const diceAudio = () => {
  const audio = new Audio('./sounds/dice-sound.wav');
  audio.play();
};

const holdPointsAudio = () => {
  const audio = new Audio('./sounds/hold-sound.wav');
  audio.play();
};

const loseAudio = () => {
  const audio = new Audio('./sounds/lose-sound.wav');
  audio.play();
};
//dice funtionality

btnRoll.addEventListener('click', () => {
  if (playing) {
    //dice sound throw
    diceAudio();
    //generate random dice number
    let dice = Math.trunc(Math.random() * 6) + 1;
    //show random dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-img/dice-${dice}.png`;
    // check for rolled 1
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      loseAudio();
      switchPlayers();
    }
  }
});
//funtionality of hold button
btnHold.addEventListener('click', () => {
  if (playing) {
    //sound hold
    holdPointsAudio();
    //add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //if total scores >= 100, win
    if (scores[activePlayer] >= 100) {
      winAudio();
      playing = false;
      diceEl.classList.add('hidden');
      btnHold.classList.add('hidden');
      btnRoll.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = `Has Ganado! 🏆`;
    } else {
      //switch player
      switchPlayers();
    }
  }
});
//funtionality of new game button
btnNew.addEventListener('click', () => {
  newGameAudio();
  diceEl.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;

  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner', 'player--active');
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  playing = true;
});

//showing modal and closing modal
const main = document.querySelector('.main');
const modalwindow = document.querySelector('.modal');
const btnInfo = document.querySelector('.btn-info');
const btnCloseModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

//functions for better code
const closeModal = () => {
  diceAudio();
  modalwindow.classList.add('hidden');
  overlay.classList.add('hidden');
  main.classList.remove('hidden');
};

const showModal = () => {
  newGameAudio();
  main.classList.add('hidden');
  overlay.classList.remove('hidden');
  modalwindow.classList.remove('hidden');
};

btnInfo.addEventListener('click', showModal);

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
