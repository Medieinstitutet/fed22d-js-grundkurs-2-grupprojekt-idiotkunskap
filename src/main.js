//import './style';

// All kod härifrån och ner är bara ett exempel för att komma igång

// I denna utils-fil har vi lagrat funktioner som ofta används, t.ex. en "blanda array"-funktion
//import { shuffle } from './utils.js';

// I denna fil har vi lagrat vår "data", i detta exempel en ofullständig kortlek
import questions from './questionsArray.js';

//Nedan har vi starta spelfunktionen där vi väljer kategori och skriver in smeknamn

document.querySelector('#startGameBtn').addEventListener('click', startGame);

const categoryOneBtn = document.querySelector('#categoryOne');
const categoryTwoBtn = document.querySelector('#categoryTwo');

/*Nedan två rader kan raderas då funktionen "checkCategory" körs i funktionen "startGame"
categoryOneBtn.addEventListener('click', checkCategory);
categoryTwoBtn.addEventListener('click', checkCategory);
*/

let playerName = '';
let categoryChoice = '';

function checkCategory() {
  if(document.getElementById('categoryOne').checked == true) {   
    categoryChoice = true;
    console.log('categoriOne');   
  } else {  
    categoryChoice = false;
    console.log('categoriTwo');    
  }  
}

//TODO

/**
 * Dölj html element vid start av spel
 * Check av namn och kategori för start av namn
 * Radiobtn/categori ska starta utan värde samt endast en vald. 
 */

function startGame() {
 
  checkCategory();

  console.log('startGame');
  // Spara spelarens nick
  playerName = document.querySelector('#playerNameInput').value;
  console.log(playerName);
  
  // Dölj HTML-elementen
  gameDescription.style.display = 'none';
  document.querySelector('#playerDetails').style.display = 'none';

  nextQuestion();
}

//Nedan kommer frågorna och svaren samt poängräkning

const questionTextDiv = document.querySelector('#questionText');
const answer1Btn = document.querySelector('#answer1');
const answer2Btn = document.querySelector('#answer2');
const answer3Btn = document.querySelector('#answer3');
const answer4Btn = document.querySelector('#answer4');

answer1Btn.addEventListener('click', checkAnswer);
answer2Btn.addEventListener('click', checkAnswer);
answer3Btn.addEventListener('click', checkAnswer);
answer4Btn.addEventListener('click', checkAnswer);

let currentQuestion = 0;
let points = 0;

function checkAnswer(e) {
  const userAnswer = e.currentTarget.innerHTML; // vilket svarsalternativ
  // vilken som är den aktuella frågan
  //varför -1: - 1 för att vi i nextQuestion har redan "gått vidare" till nästa fråga
  // så vi vill ha rätt svar för föregående fråga
  const correctAnswer = questions[currentQuestion - 1].correctAnswer;
  if (userAnswer === correctAnswer) { // jämföra frågans rätt svar med tryckt knapp
    // ge ett poäng!
    points++;
  } else {
    // ge minus
  }
  nextQuestion();
}

function nextQuestion() {
  if (currentQuestion >= questions.length) { // > =
    gameOver();
    return;
  }

  questionTextDiv.innerHTML = questions[currentQuestion].questionText;
  answer1Btn.innerHTML = questions[currentQuestion].answerOptions[0];
  answer2Btn.innerHTML = questions[currentQuestion].answerOptions[1];
  answer3Btn.innerHTML = questions[currentQuestion].answerOptions[2];
  answer4Btn.innerHTML = questions[currentQuestion].answerOptions[3];

  currentQuestion++; // += 1, currentQuestion = currentQuestion + 1;
}

document.querySelector('#restartGameBtn').addEventListener('click', restartGame);

function restartGame() {
  document.querySelector('#gameOver').style.display = 'none';
  document.querySelector('#questionContainer').classList.remove('hidden');
  currentQuestion = 0;
  points = 0;
  nextQuestion();
}

function gameOver() {
  document.querySelector('#gameOver').style.display = 'block';
  document.querySelector('#questionContainer').classList.add('hidden');
  document.querySelector('#pointsContainer').innerHTML = `Du fick ${points} poäng!`;
  // document.querySelector('#gameOver').classList.toggle('hidden');
}