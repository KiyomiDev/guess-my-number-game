'use strict';
const gameContainer = document.querySelector('.container');
const levelsContainer = document.querySelector('.select-level');
const levelsBox = document.querySelectorAll('.level');
const header = document.querySelector('.header');
const secretNumEl = document.querySelector('.number');
const mainSection = document.querySelector('main');
const guessInput = document.querySelector('.guess-input');
const checkBtn = document.querySelector('.check');
const score = document.querySelector('.score span');
const highscore = document.querySelector('.highscore span');
const message = document.querySelector('.message');
const again = document.querySelector('.play-again');
const numberBetween = document.querySelector('.number-between');
const correct = new Audio("sound-effects/correct.mp3"),
      fail = new Audio("sound-effects/fail.mp3"),
      lost = new Audio("sound-effects/lost.mp3");
      
let max, selectedLevel, selectedLevelScore, randomNum;

levelsBox.forEach(level => {
  level.addEventListener('click', () => {
    max = Number(level.dataset.max);
    selectedLevel = level.dataset.level;

    randomNumber(max);
    setLevelScore(selectedLevel);

    levelsContainer.classList.add('hide-slow');

    setTimeout(() => {
      levelsContainer.classList.add('hide');
      header.classList.remove('hide');
      mainSection.classList.remove('hide');
    }, 600);

    numberBetweenText(max);
  })
});

const changeElContent = (el, text) => el.textContent = text;

const numberBetweenText = (max) => changeElContent(numberBetween, `(Between 1 and ${max})`);

function setLevelScore(selectedLevel) {
  if (selectedLevel === 'easy') selectedLevelScore = 20;
  else if (selectedLevel === 'medium') selectedLevelScore = 25;
  else selectedLevelScore = 30;
  changeElContent(score, selectedLevelScore);
}

const randomNumber = (max) => randomNum = Math.floor(Math.random() * max) + 1;

function checkNumber() {
  let guessInputValue = guessInput.value;
  if (!guessInputValue) changeElContent(message, `⛔️ No number!`);
    
  else if (guessInputValue < 1 || guessInputValue > max) changeElContent(message, `⛔ Enter number between (1 and ${max})`);
    
  else if (guessInputValue != randomNum) {
    fail.play();
    changeElContent(message, `My number is ${guessInputValue > randomNum ? 'less' : 'greater'} than ${guessInputValue}`);
    score.textContent -= 1;
  }

  else {
    correct.play();
    changeElContent(message, `🎉 Correct Number!`);
    gameEnd(true)
    gameContainer.style.backgroundColor = '#60b347';
    changeElContent(secretNumEl, `${randomNum}`);
    disableInput(true);
    if (score.textContent > highscore.textContent) {
      changeElContent(highscore, score.textContent)
    }
  }
  
  if (score.textContent === '0') {
    setTimeout(() => lost.play(), 300);
    changeElContent(message, `👎 You lost the game!`);
    gameEnd(true)
    changeElContent(secretNumEl, `${randomNum}`);
    disableInput(true);
  }
}

checkBtn.addEventListener('click', checkNumber);

const playAgain = _ => {
  randomNumber(max);
  changeElContent(secretNumEl, `?`);
  changeElContent(message, `Start guessing...`);
  changeElContent(score, selectedLevelScore);
  guessInput.value = '';
  gameContainer.style.backgroundColor = '#222';
  gameEnd(false)
  disableInput(false);
}

again.addEventListener('click', playAgain);

function disableInput(disable) {
  guessInput.disabled = disable === true ? true : false;
}  

function gameEnd(end) {
  if (end) {
    checkBtn.removeEventListener('click', checkNumber);
    checkBtn.classList.add('not-allowed');
  } else {
    checkBtn.addEventListener('click', checkNumber);
    checkBtn.classList.remove('not-allowed');
  }
}