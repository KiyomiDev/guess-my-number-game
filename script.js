'use strict';
const levelsContainer = document.querySelector('.select-level');
const levelsBox = document.querySelectorAll('.level');
const header = document.querySelector('.header');
const mainSection = document.querySelector('main');
const score = document.querySelector('.score span');
const numberBetween = document.querySelector('.number-between');
let max, selectedLevel, selectedLevelScore, randomNum;

levelsBox.forEach(level => {
  level.addEventListener('click', () => {
    max = Number(level.dataset.max);
    selectedLevel = level.dataset.level;

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