const questions = [
   { question: "What is phishing?", options: ["A) A type of fish", "B) A scam to trick people into giving information", "C) A secure email protocol", "D) A firewall setting"], answer: "B", explanation: "Phishing is a scam to steal sensitive information via fake emails or websites." },
    { question: "What should you do if you get a suspicious email?", options: ["A) Click all links to investigate", "B) Reply with your personal details", "C) Report and delete it", "D) Forward it to friends"], answer: "C", explanation: "Suspicious emails should be reported to your IT team or email provider and deleted to avoid phishing risks." },
    { question: "Which is the strongest password?", options: ["A) password123", "B) P@ssw0rd!2023", "C) 123456", "D) myname"], answer: "B", explanation: "Strong passwords include a mix of letters, numbers, and symbols, like P@ssw0rd!2023." },
    { question: "What is malware?", options: ["A) A helpful program", "B) Harmful software like viruses", "C) An antivirus tool", "D) A type of hardware"], answer: "B", explanation: "Malware is harmful software designed to damage or steal data from your device." },
    { question: "What does a VPN do?", options: ["A) Speeds up your computer", "B) Encrypts your internet connection", "C) Blocks all websites", "D) Deletes malware"], answer: "B", explanation: "A VPN encrypts your internet connection to protect your data on public networks." },
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    showQuestion();
}

function showQuestion() {
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        document.getElementById("question").textContent = `Q${currentQuestion + 1}: ${q.question}`;
        document.getElementById("optionA").textContent = q.options[0];
        document.getElementById("optionB").textContent = q.options[1];
        document.getElementById("optionC").textContent = q.options[2];
        document.getElementById("optionD").textContent = q.options[3];
        document.getElementById("quiz-form").reset();
    } else {
        endQuiz();
    }
}

document.getElementById("quiz-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert("Please select an answer!");
        return;
    }
    const answer = selected.value;
    if (answer === questions[currentQuestion].answer) {
        score++;
        alert("Correct!");
    } else {
        alert(`Incorrect! The correct answer is ${questions[currentQuestion].answer}.`);
    }
    currentQuestion++;
    showQuestion();
});

function endQuiz() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
    document.getElementById("score").textContent = `Your score: ${score}/${questions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("end-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    showQuestion();
}