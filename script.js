'use strict';


let currentScore, activePlayer, score, playing;

// selecting Elements..

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let currentScore0Element = document.getElementById('current--0');
let currentScore1Element = document.querySelector('#current--1');

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');


let init = function () {

    currentScore = 0;
    activePlayer = 0;
    score = [0, 0];
    playing = true;

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    currentScore0Element.textContent = 0;
    currentScore1Element.textContent = 0;

    // // hide the dice 
    diceElement.classList.add('hidden');
    player1Element.classList.remove('player--winner');
    player0Element.classList.remove('player--winner');

    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');

}
init();


// functions
let rolledDice = function () {
    let randomNo = Math.trunc(Math.random() * 6 + 1);
    return randomNo;
}
let switchPlayer = function () {
    // set previous player and current score to zero
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    // change the active player 
    activePlayer = (activePlayer === 0 ? 1 : 0);
    // togggle the backgorund
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}



// operations on element
score0Element.textContent = '0';
score1Element.textContent = '0';
// hide the dice 
diceElement.classList.add('hidden');



// button roll functionality......1
btnRoll.addEventListener('click', function () {
    if (playing) {
        let dice = rolledDice();
        // display dice
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;
        // check for rolled dice
        if (dice !== 1) {
            // add dice to the current score
            currentScore += dice;
            console.log(currentScore);
            // currentScore0Element.textContent = currentScore;
            // update current score dynamically
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            // switch to the next player
            switchPlayer();
        }
    }
})



// button hold functionality
btnHold.addEventListener('click', function () {
    if (playing) {
        // hold the current score 
        score[activePlayer] += currentScore;
        // set score to zero
        document.getElementById(`current--${activePlayer}`).textContent = 0;


        // display new high score 
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];


        // check if score >=100
        if (score[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
        } else {
            // switch the user 
            switchPlayer();
        }
    }
})



// button new functionality
btnNew.addEventListener(`click`, init);











 