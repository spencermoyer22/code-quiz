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
var quizHeader = document.querySelector("header")
var score = 0;
var highscores = [];
var timeLeft = 0;
var questionIndex = 0;

var homeScreen = function() {
    // create header for quiz
    var quizHeader = document.createElement("header");
    
    quizContentEl.appendChild(quizHeader);

    //create anchor for header
    var anchorEl = document.createElement("a");
    anchorEl.href="highscores.html";
    anchorEl.textContent = "View Highscores";

    quizHeader.appendChild(anchorEl);

    // create p element for header
    var pEl = document.createElement("p");
    pEl.innerHTML = "Time Left: <span class='counter'></span>";

    quizHeader.appendChild(pEl);

    //create container for quiz home page
    var container = document.createElement("div");
    container.className="container container-home";

    quizContentEl.appendChild(container);

    // Create h1 element for quiz home page
    var quizTitle = document.createElement("h1");
    quizTitle.textContent = "JavaScript Quiz Challenge";

    container.appendChild(quizTitle);
    
    // create description for quiz under h1 element
    var quizDescription = document.createElement("p");
    quizDescription.textContent = "Answer the JavaScript related code questions within the time limit. If you answer incorrectly you will be penalized 10 seconds.";

    container.appendChild(quizDescription);

    var buttonStart = document.createElement("button");
    buttonStart.textContent= "Start Quiz";
    buttonStart.className = "btn btn-start";

    container.append(buttonStart);
};

var beginQuiz = function() {
    // begin counting down
    countdown();

    // call function to add questions elements
    addQuestions();
};

var addQuestions = function() {
    if (questionIndex + 1 > questionsArray.length) {
        endQuiz();
        return;
    }

    // remove the quiz home page
    var oldContainer = document.querySelector(".container");
    oldContainer.remove();

    // create new container for quiz questions and answers
    var quizContainer = document.createElement("div");
    quizContainer.className = "container";

    quizContentEl.appendChild(quizContainer);

    //create question el for container
    var questionEl = document.createElement("h2");

    quizContainer.appendChild(questionEl);

    // Create answer elements for container
    var answer1 = document.createElement("button");
    answer1.className = "btn btn-answer";
    answer1.setAttribute("id", 1);

    quizContainer.appendChild(answer1);

    var answer2 = document.createElement("button");
    answer2.className = "btn btn-answer";
    answer2.setAttribute("id", 2);

    quizContainer.appendChild(answer2);

    var answer3 = document.createElement("button");
    answer3.className = "btn btn-answer";
    answer3.setAttribute("id", 3);

    quizContainer.appendChild(answer3);

    var answer4 = document.createElement("button");
    answer4.className = "btn btn-answer";
    answer4.setAttribute("id", 4);

    quizContainer.appendChild(answer4);

    
    questionEl.textContent = questionsArray[questionIndex].question;
    answer1.textContent = questionsArray[questionIndex].choices[0];
    answer2.textContent = questionsArray[questionIndex].choices[1];
    answer3.textContent = questionsArray[questionIndex].choices[2];
    answer4.textContent = questionsArray[questionIndex].choices[3];
};

var buttonHandler = function() {
    //get target element
    var targetEl = event.target;

    if (targetEl.matches(".btn-start")) {
        beginQuiz();
    }
    else if (targetEl.matches(".btn-answer")) {
        checkAnswer();
    }
    else if (targetEl.matches(".btn-score")) {
        var savedInitials = document.querySelector("#initials").value;
        var savedScore = score;

        // verify input is entered into input field
        if (!savedInitials) {
            alert("Enter your initials.");
            endQuiz();
            return;
        }

        else {
            highscores.push({
                initials: savedInitials,
                highscore: savedScore
            });
        }

        saveScores();

       window.location.replace("highscores.html")
    }
};

var countdown = function() {
      timeLeft = 75;
      var counter = document.querySelector(".counter");

      var timeCountdown = setInterval(function() {
          if (timeLeft > 0) {
            counter.textContent = timeLeft;
            timeLeft--;
          }
          else {
              counter.textContent = timeLeft;
              endQuiz();
          }
      }, 1000);
};
    
var checkAnswer = function() {
    var buttonClicked = event.target;
    var buttonId = buttonClicked.getAttribute("id");
    
    if (parseInt(buttonId) === questionsArray[questionIndex].answer) {
        score += 10;
        questionIndex++;
        addQuestions();
    }
    else {
        // subtract penalty from time left
        timeLeft -= 10;
        questionIndex++;
        addQuestions();
    }
};

var endQuiz = function() {
    // remove quiz questions and aswers buttons
    var oldContainer = document.querySelector(".container");
    oldContainer.remove();

    // create container for end of quiz
    var endQuizContainer = document.createElement("div");
    endQuizContainer.className = "container container-end";

    quizContentEl.appendChild(endQuizContainer);

    // add h2 element
    var h2El = document.createElement("h2");
    h2El.textContent = "All done!";

    endQuizContainer.appendChild(h2El);

    // add p element
    var pEl = document.createElement("p");
    pEl.textContent = "Your final score is " + score + ".";

    endQuizContainer.appendChild(pEl);

    // add elements to take high score
    var labelEl = document.createElement("label")
    labelEl.setAttribute("for", "#initials");
    labelEl.setAttribute("name", "initials");
    labelEl.textContent = "Enter initials:";

    endQuizContainer.appendChild(labelEl);

    var inputEl = document.createElement("input");
    inputEl.setAttribute("id", "initials")
    inputEl.setAttribute("type", "text");

    endQuizContainer.appendChild(inputEl);

    var buttonEl = document.createElement("button")
    buttonEl.className = "btn btn-score";
    buttonEl.textContent = "Save Score";

    endQuizContainer.appendChild(buttonEl);
};

var saveScores = function() {
    localStorage.setItem("scores", JSON.stringify(highscores));
};

var loadScores = function() {
    // retrieve scores from storage
    var savedScores = localstorage.getItem("scores");

    // check if value is null
    if (!savedScores) {
        return false;
    }

    // change stringed storage back to array
    savedScores = JSON.parse(savedScores);

    // loop through array to print to the page
    for (var i = 0; i < highscores.length; i++) {
        createHighScoreEl(savedScores[i]);
    }
};

var createHighScoreEl = function(highscoreObj) {
    // create p element

    var pEl = document.createElement("p");
    pEl.className = "highscore-info";
};

var deleteScores = function () {
    
};

quizContentEl.addEventListener("click", buttonHandler);

homeScreen();

loadScores();