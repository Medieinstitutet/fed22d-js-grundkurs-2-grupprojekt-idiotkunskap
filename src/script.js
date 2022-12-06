//Detta ska in i main.ts men vill inte ta bort förens ni har sätt exemplena så låter denna ligga här 

const gameDescText = 'Välkommen till quizet om programmering!';
const gameDescription = document.querySelector('#gameDescription');

gameDescription.innerHTML = gameDescText;

document.querySelector('#startGameBtn').addEventListener('click', startGame);

let playerName = '';

const questions = [
  {
    questionText: 'Vad är en variabel?',
    answerOptions: [
      'Blå',
      'Behållare för ett värde',
      'En munk'
    ],
    correctAnswer: 'Behållare för ett värde',
  },
  {
    questionText: 'Vad blir det för mat?',
    answerOptions: [
      'Pasta',
      'Sushi',
      'Indiskt'
    ],
    correctAnswer: 'Pasta',
  }
];


function startGame() {
  console.log('startGame');
  // Spara spelarens nick
  playerName = document.querySelector('#playerNameInput').value;
  
  // Dölj HTML-elementen
  gameDescription.style.display = 'none';
  document.querySelector('#playerDetails').style.display = 'none';

  nextQuestion();
}

const questionTextDiv = document.querySelector('#questionText');
const answer1Btn = document.querySelector('#answer1');
const answer2Btn = document.querySelector('#answer2');
const answer3Btn = document.querySelector('#answer3');

answer1Btn.addEventListener('click', checkAnswer);
answer2Btn.addEventListener('click', checkAnswer);
answer3Btn.addEventListener('click', checkAnswer);

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