'use strict';
const gameContainer = document.querySelector('.container');
const levelsContainer = document.querySelector('.select-level');
const levelsBox = document.querySelectorAll('.level');
const header = document.querySelector('.header');
const mainSection = document.querySelector('main');
const guessInput = document.querySelector('.guess-input');
const checkBtn = document.querySelector('.check');
const score = document.querySelector('.score span');
const highscore = document.querySelector('.highscore span');
const message = document.querySelector('.message');
const numberBetween = document.querySelector('.number-between');
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
    message.textContent = `My number is less than  ${guessInputValue}`;
    score.textContent -= 1;
  }
    
  else if (guessInputValue < randomNum) {
    message.textContent = `My number is greater than ${guessInputValue}`;
    score.textContent -= 1;
  }

  else {
    message.textContent = `🎉 Correct Number!`;
    highscore.textContent = score.textContent;
    checkBtn.removeEventListener('click', checkNumber);
    gameContainer.style.backgroundColor = '#60b347';
  }
  
  if (score.textContent === '0') {
    message.textContent = `👎 You lost the game!`
    checkBtn.removeEventListener('click', checkNumber);
  }
}

checkBtn.addEventListener('click', checkNumber);