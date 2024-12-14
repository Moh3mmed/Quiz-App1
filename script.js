// Sample Questions (Can be updated/edited)
const questions = [
    { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"], correct: 1 },
    { question: "What is the process of photosynthesis?", options: ["Respiration", "Transpiration", "Fermentation", "Light energy to chemical energy"], correct: 3 },
    { question: "Which organ is responsible for pumping blood?", options: ["Brain", "Heart", "Lungs", "Liver"], correct: 1 },
    { question: "What is the chemical formula for water?", options: ["CO2", "O2", "H2O", "CH4"], correct: 2 },
    { question: "Who proposed the theory of evolution?", options: ["Newton", "Darwin", "Einstein", "Mendel"], correct: 1 },
    { question: "What is the genetic material in humans?", options: ["RNA", "DNA", "Proteins", "Carbohydrates"], correct: 1 },
    { question: "What is the main function of the white blood cells?", options: ["Transport oxygen", "Fight infections", "Digest food", "Produce energy"], correct: 1 },
    { question: "Which system controls voluntary actions?", options: ["Nervous system", "Digestive system", "Circulatory system", "Respiratory system"], correct: 0 }
];

let currentQuestionIndex = -1;
let score = 0;
let timerValue = 30;
let timerInterval;
let leaderboard = [];

function register() {
    const studentName = document.getElementById("studentName").value;
    if (studentName) {
        generateQRCode(studentName);
    }
}

function generateQRCode(name) {
    const qrCode = new QRCode(document.getElementById("qr-code"), {
        text: `Name: ${name}`,
        width: 128,
        height: 128
    });
}

function spinWheel() {
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    displayQuestion();
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("questionText").innerText = question.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
    });
    startTimer();
}

function startTimer() {
    timerValue = 30;
    document.getElementById("timer").innerText = timerValue;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timerValue--;
        document.getElementById("timer").innerText = timerValue;
        if (timerValue <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        showResult();
    } else {
        displayQuestion();
    }
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").innerText = score;
    leaderboard.push({ name: document.getElementById("studentName").value, score });
}

function viewLeaderboard() {
    leaderboard.sort((a, b) => b.score - a.score);
    const scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = '';
    leaderboard.forEach(entry => {
        const li = document.createElement("li");
        li.innerText = `${entry.name}: ${entry.score}`;
        scoreList.appendChild(li);
    });
    document.getElementById("leaderboard").style.display = "block";
}
