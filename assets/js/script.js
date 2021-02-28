var questionsArray = [
    {
        question: "What JavaScript function allows you to change the HTML content?",
        choices: [".text", ".innerHTML", ".createElement", ".querySelector"],
        answer: 2
    },
    {
        question: "What is the correct way to link a JavaScript file?",
        choices: ["script src=script.js", "<script src=script.js>", "<script src='script.js'>", "<script href='script.js'"],
        answer: 3
    },
    {
        question: "The values for an array are stored in what?",
        choices: ["square brackets", "parentheses", "curly brackets", "greater/lesser than"],
        answer: 1
    },
    {
        question: "How do you create comments on a single line?",
        choices: ["<!--This is a comment-->", "/*This is a comment*/", "*This is a comment*", "//This is a comment"],
        answer: 4
    },
    {
        question: "How to you create a new HTML element in JavaScript?",
        choices: [".appendChild()", ".querySelector()", ".createHTML", ".createElement()"],
        answer: 4
    }
];
var quizContentEl = document.querySelector("#quiz-body");
var timeLeft = 0;
var highscores = [];

var homeScreen = function() {
    // Create h1 element for quiz home page
    var quizTitle = document.createElement("h1");
    quizTitle.textContent = "JavaScript Quiz Challenge";

    quizContentEl.appendChild(quizTitle);
    
    // create description for quiz under h1 element
    var quizDescription = document.createElement("p");
    quizDescription.textContent = "Answer the JavaScript related code questions within the time limit. If you answer incorrectly you will be pentalized 10 seconds.";

    quizContentEl.appendChild(quizDescription);

    var buttonStart = document.createElement("button");
    buttonStart.textContent= "Start Quiz";
    buttonStart.className = "btn btn-start";

    quizContentEl.append(buttonStart);
}

homeScreen();