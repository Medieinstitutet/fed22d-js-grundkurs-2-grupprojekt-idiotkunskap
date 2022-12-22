import './style/style.scss';

// I denna fil har vi lagrat vår frågor
import questions from './questionsArray.js';

//Nedan har vi starta-spel funktionen där vi väljer kategori och skriver in smeknamn
document.querySelector('#startGameBtn').addEventListener('click', startGame);

//Spelets variabler
let currentQuestion = 0;
let points = 0;
let playerName = '';

//Nedan kommer frågorna och svaren
const questionTextDiv = document.querySelector('#questionText');
const answer1Btn = document.querySelector('#answer1');
const answer2Btn = document.querySelector('#answer2');
const answer3Btn = document.querySelector('#answer3');
const answer4Btn = document.querySelector('#answer4');
const nextQuestionBtn = document.querySelector('#nextQuestion');

answer1Btn.addEventListener('click', checkClickedAnswer);
answer2Btn.addEventListener('click', checkClickedAnswer);
answer3Btn.addEventListener('click', checkClickedAnswer);
answer4Btn.addEventListener('click', checkClickedAnswer);
nextQuestionBtn.addEventListener('click', checkAnswer);

document.querySelector('#restartGameBtn').addEventListener('click', restartGame);
document.querySelector('#firstPage').classList.remove('firstPage');

//Funktion för att blanda frågorna
shuffle(questions);

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

//Funktion för att välja kategori
function checkCategory() { 
  if (document.querySelector('#categoryOne').checked == true){
    var type = 1,  i;                                  
    for (i = questions.length - 1; i >= 0; --i) {          
    if (questions[i].isSecondCategory == true) {
        questions.splice(i, type);
    }
  }
  console.log("Kategori 1")

  }
  else if (document.querySelector('#categoryTwo').checked == true){
    var type2 = 1,  i;                                  
    for (i = questions.length - 1; i >= 0; --i) {          
    if (questions[i].isSecondCategory == false) {
        questions.splice(i, type2);
    }
  }
  console.log("Kategori 2")
  }
}

// Nedan är det första spelaren möts av. Det är även denna funktion som körs när man trycker på "restartGameBtn"
function startScreen() {
  gameDescription.style.display = 'block';
  document.querySelector('#playerDetails').style.display = 'block';
  document.querySelector('#gameCategories').style.display = 'block';
  document.querySelector('#gameOver').style.display = 'none';
  document.querySelector('#questionContainer').style.display = 'none';

  console.log('startGame');
  // Spara spelarens nick
  playerName = document.querySelector('#playerNameInput').value;
  console.log(playerName);
}

startScreen();

//Funktion för att starta spelet efter att spelaren matat in smeknamn och valt kategori
function startGame() {
  // Dölj HTML-elementen
  gameDescription.style.display = 'none';
  document.querySelector('#playerDetails').style.display = 'none';
  document.querySelector('#gameCategories').style.display = 'none';
  document.querySelector('#gameOver').style.display = 'none';
  document.querySelector('#questionContainer').style.display = 'block';
  
  // Visa question container
  document.querySelector('#questionContainer').classList.remove('questionContainer');
  
  checkCategory();
  nextQuestion();
}

// Funktion för svarsalternativ
function checkClickedAnswer(e){
  const userAnswer = e.currentTarget.innerHTML;
  const correctAnswer = questions[currentQuestion - 1].correctAnswer;
  if (userAnswer === correctAnswer) { 
    points++;
  } else {
    points -=1;
  }
}

// Funktion för svara-knappen
function checkAnswer(e) {
  nextQuestion();
}

//Funktion för att gå vidare till nästa fråga samt att kontrollera att det inte finns fler frågor
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

//Funktion för att starta om spelet efter att spelaren klickat på "Spel igen"
function restartGame() {
  location.reload(); //Återställer "questions" array vid omstart
  document.querySelector('#gameOver').style.display = 'none';
  document.getElementById("categoryOne").checked = false; //Tömmer kategorier vid omstart
  document.getElementById("categoryTwo").checked = false; //Tömmer kategorier vid omstart
  currentQuestion = 0;
  points = 0;
  startScreen();
}

//Funktion för att visa "Game Over" skärmen
function gameOver() {
  document.querySelector('#gameOver').style.display = 'block';
  document.querySelector('#pointsContainer').innerHTML = `Du fick ${points} poäng!`;
  document.querySelector('#questionContainer').style.display = 'none';
}