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

const numberBetweenText = (max) => numberBetween.textContent = `(Between 1 and ${max})`;

function setLevelScore(selectedLevel) {
  if (selectedLevel === 'easy') selectedLevelScore = 20;
  else if (selectedLevel === 'medium') selectedLevelScore = 25;
  else selectedLevelScore = 30;
  score.textContent = selectedLevelScore;
}

const randomNumber = (max) => randomNum = Math.floor(Math.random() * max) + 1;

function checkNumber() {
  let guessInputValue = guessInput.value;
  if (!guessInputValue) message.textContent = `⛔️ No number!`;
    
  else if (guessInputValue < 1) message.textContent = `⛔ Enter number between (1 and ${max})`;
    
  else if (guessInputValue > randomNum) {
    fail.play();
    message.textContent = `My number is less than  ${guessInputValue}`;
    score.textContent -= 1;
  }
    
  else if (guessInputValue < randomNum) {
    fail.play();
    message.textContent = `My number is greater than ${guessInputValue}`;
    score.textContent -= 1;
  }

  else {
    correct.play();
    message.textContent = `🎉 Correct Number!`;
    checkBtn.removeEventListener('click', checkNumber);
    gameContainer.style.backgroundColor = '#60b347';
    secretNumEl.textContent = `${randomNum}`;
    if (score.textContent > highscore.textContent) {
      highscore.textContent = score.textContent;
    }
  }
  
  if (score.textContent === '0') {
    setTimeout(() => lost.play(), 300);
    message.textContent = `👎 You lost the game!`
    checkBtn.removeEventListener('click', checkNumber);
  }
}

checkBtn.addEventListener('click', checkNumber);

const playAgain = _ => {
  randomNumber(max);
  secretNumEl.textContent = `?`;
  message.textContent = `Start guessing...`;
  score.textContent = selectedLevelScore;
  guessInput.value = '';
  gameContainer.style.backgroundColor = '#222';
  checkBtn.addEventListener('click', checkNumber);
}

again.addEventListener('click', playAgain);