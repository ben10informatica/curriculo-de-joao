const questions = [
    {
        question: "Qual é a linguagem de programação mais popular do mundo?",
        answers: [
            "JavaScript",
            "Python",
            "Java",
            "C++"
        ],
        correct: 0
    },
    {
        question: "O que significa HTML?",
        answers: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Qual é o operador de comparação estrita em JavaScript?",
        answers: [
            "==",
            "===",
            "=",
            "!="
        ],
        correct: 1
    },
    {
        question: "O que é um array?",
        answers: [
            "Um tipo de dado que armazena apenas números",
            "Uma estrutura de dados que armazena elementos em sequência",
            "Um operador matemático",
            "Um tipo de função"
        ],
        correct: 1
    },
    {
        question: "O que significa CSS?",
        answers: [
            "Computer Style System",
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 1
    },
    {
        question: "Qual é a função do comando 'git clone'?",
        answers: [
            "Criar um novo repositório",
            "Copiar um repositório existente",
            "Deletar um repositório",
            "Atualizar um repositório"
        ],
        correct: 1
    },
    {
        question: "O que é um loop 'for'?",
        answers: [
            "Uma condição que executa apenas uma vez",
            "Uma estrutura de repetição que executa um bloco de código várias vezes",
            "Uma função matemática",
            "Um tipo de variável"
        ],
        correct: 1
    },
    {
        question: "O que é uma API?",
        answers: [
            "Um tipo de linguagem de programação",
            "Um software de edição de código",
            "Uma interface de programação de aplicações",
            "Um sistema operacional"
        ],
        correct: 2
    },
    {
        question: "O que significa SQL?",
        answers: [
            "Strong Question Language",
            "Structured Query Language",
            "System Quality Language",
            "Simple Query Language"
        ],
        correct: 1
    },
    {
        question: "O que é um framework?",
        answers: [
            "Um tipo de banco de dados",
            "Uma linguagem de programação",
            "Uma estrutura que facilita o desenvolvimento de software",
            "Um editor de código"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const currentQuestionElement = document.getElementById('current-question');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const correctAnswersElement = document.getElementById('correct-answers');
const restartBtn = document.getElementById('restart-btn');

function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestion];
    currentQuestionElement.textContent = currentQuestion + 1;
    questionElement.textContent = question.question;
    
    answersElement.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersElement.appendChild(button);
    });
}

function selectAnswer(index) {
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(button => button.disabled = true);

    const correct = questions[currentQuestion].correct;
    
    if (index === correct) {
        buttons[index].classList.add('correct');
        score += 100;
        correctAnswers++;
        scoreElement.textContent = score;
    } else {
        buttons[index].classList.add('wrong');
        buttons[correct].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScoreElement.textContent = score;
    correctAnswersElement.textContent = correctAnswers;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
    scoreElement.textContent = '0';
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz); 