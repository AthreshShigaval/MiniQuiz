const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let allQuestions = [];

/*
let questions = [
    {
    question: "What is your favorite color",
    choice1: "Red",
    choice2: "Blue",
    choice3: "White",
    choice4: "Pink",
    answer: 3
    },
    {
        question: "What is your favorite food",
        choice1: "Pasta",
        choice2: "Dose",
        choice3: "Pizza",
        choice4: "Burger",
        answer: 2
    },
    {
        question: "Who is your favorite car brand",
        choice1: "Audi",
        choice2: "BMW",
        choice3: "Merc",
        choice4: "Volvo",
        answer: 1
    }    
] 
*/

let questions = [];
fetch("questions.json")
.then(res => {
    return res.json();
})
.then(loadedQuestions => {
console.log(loadedQuestions);
questions=loadedQuestions;
startGame();
})
.catch(err => {
 console.error(err);
});

//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    allQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if (allQuestions.length === 0 || questionCounter >= MAX_QUESTIONS)
    {
        localStorage.setItem('latestScore',score);
        return window.location.assign('/end.html');
    } 
 
   questionCounter++;
    //HUD
   progressText.innerText = "Question  " + questionCounter + "/" + MAX_QUESTIONS;
    //Progress bar
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) *100}%`;

   const questionIndex = Math.floor(Math.random() * allQuestions.length);
   currentQuestion = allQuestions[questionIndex];
   question.innerText = currentQuestion.question;

   choices.forEach(choice => {
       const number = choice.dataset["number"];
       choice.innerText = currentQuestion["choice" + number];
   });
   allQuestions.splice(questionIndex, 1);
   acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", j => {
        const selectedChoice = j.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "wrong";

        if(classToApply === "correct")
            incrementScore (CORRECT_BONUS);

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
      
     // getNewQuestion();
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

