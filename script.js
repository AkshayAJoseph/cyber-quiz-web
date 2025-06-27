const questions = [
    { question: "What is phishing?", options: ["A) A type of fish", "B) A scam to trick people into giving information", "C) A secure email protocol", "D) A firewall setting"], answer: "B", explanation: "Phishing is a scam to steal sensitive information via fake emails or websites." },
    { question: "What should you do if you get a suspicious email?", options: ["A) Click all links to investigate", "B) Reply with your personal details", "C) Report and delete it", "D) Forward it to friends"], answer: "C", explanation: "Suspicious emails should be reported to your IT team or email provider and deleted to avoid phishing risks." },
    { question: "Which is the strongest password?", options: ["A) password123", "B) P@ssw0rd!2023", "C) 123456", "D) myname"], answer: "B", explanation: "Strong passwords include a mix of letters, numbers, and symbols, like P@ssw0rd!2023." },
    { question: "What is malware?", options: ["A) A helpful program", "B) Harmful software like viruses", "C) An antivirus tool", "D) A type of hardware"], answer: "B", explanation: "Malware is harmful software designed to damage or steal data from your device." },
    { question: "What does a VPN do?", options: ["A) Speeds up your computer", "B) Encrypts your internet connection", "C) Blocks all websites", "D) Deletes malware"], answer: "B", explanation: "A VPN encrypts your internet connection to protect your data on public networks." },
    { question: "What is the purpose of two-factor authentication (2FA)?", options: ["A) To make your password longer", "B) To require two devices for login", "C) To add an extra layer of security with a second verification step", "D) To automatically update your software"], answer: "C", explanation: "Two-factor authentication adds an extra layer of security by requiring a second verification step." },
    { question: "What should you do if you suspect a website is fake?", options: ["A) Enter your login details to test it", "B) Check for 'https://' and a padlock icon in the browser", "C) Download any files offered to verify the site", "D) Share the link with colleagues to get their opinion"], answer: "B", explanation: "A fake website may lack 'https://' or a padlock, indicating it’s not secure." },
    { question: "What is a common sign of a phishing email?", options: ["A) It comes from a trusted company logo", "B) It asks for immediate action or threatens consequences", "C) It has perfect grammar and no errors", "D) It includes a PDF attachment"], answer: "B", explanation: "Phishing emails often use urgent language to trick users into acting quickly." },
    { question: "Why is it important to update your software regularly?", options: ["A) To get new features only", "B) To improve device speed", "C) To patch security vulnerabilities and protect against attacks", "D) To change the software’s appearance"], answer: "C", explanation: "Software updates patch vulnerabilities to protect against cyber threats." },
    { question: "What is a key benefit of using a password manager?", options: ["A) It allows you to reuse the same password across sites", "B) It stores and generates strong, unique passwords securely", "C) It automatically shares passwords with trusted contacts", "D) It reduces the need for antivirus software"], answer: "B", explanation: "Password managers create and store unique, strong passwords to enhance security." }
];

let currentQuestion = 0;
let score = 0;
let playerName = "";

function startQuiz() {
    playerName = document.getElementById("player-name").value.trim();
    if (!playerName) {
        document.getElementById("explanation").textContent = "Please enter a name or alias!";
        document.getElementById("explanation").style.display = "block";
        return;
    }
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    showQuestion();
}

function showQuestion() {
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        document.getElementById("question").textContent = `Question ${currentQuestion + 1}/${questions.length}: ${q.question}`;
        document.getElementById("optionA").textContent = q.options[0];
        document.getElementById("optionB").textContent = q.options[1];
        document.getElementById("optionC").textContent = q.options[2];
        document.getElementById("optionD").textContent = q.options[3];
        document.getElementById("quiz-form").reset();
        document.getElementById("explanation").style.display = "none";
        document.getElementById("submit-button").style.display = "block";
        document.getElementById("next-button").style.display = "none";
    } else {
        endQuiz();
    }
}

function updateScoreboard(addNewScore = false) {
    let scoreboard = JSON.parse(localStorage.getItem("scoreboard") || "[]");
    
    if (addNewScore && playerName && score >= 0) {
        scoreboard.push({
            id: Date.now(), 
            name: playerName,
            score: score,
            timestamp: new Date().toISOString()
        });
      
        scoreboard.sort((a, b) => b.score - a.score || new Date(b.timestamp) - new Date(a.timestamp));
       
        scoreboard = scoreboard.slice(0, 5);
        localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
    }

    const startScoreboard = document.getElementById("start-scoreboard");
    const endScoreboard = document.getElementById("end-scoreboard");
    startScoreboard.innerHTML = "";
    endScoreboard.innerHTML = "";
    if (scoreboard.length === 0) {
        const noScores = "<p>No scores yet!</p>";
        startScoreboard.innerHTML = noScores;
        endScoreboard.innerHTML = noScores;
    } else {
        scoreboard.forEach((entry, index) => {
            const date = new Date(entry.timestamp).toLocaleString();
            const entryText = `${index + 1}. ${entry.name}: ${entry.score}/${questions.length} (Played: ${date})`;
            startScoreboard.innerHTML += `<p>${entryText}</p>`;
            endScoreboard.innerHTML += `<p>${entryText}</p>`;
        });
    }
}

function clearScoreboard() {
    localStorage.removeItem("scoreboard");
    updateScoreboard();
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

document.getElementById("quiz-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const selected = document.querySelector('input[name="answer"]:checked');
    const explanationDiv = document.getElementById("explanation");
    const submitButton = document.getElementById("submit-button");
    const nextButton = document.getElementById("next-button");
    if (!selected) {
        explanationDiv.textContent = "Please select an answer!";
        explanationDiv.style.display = "block";
        return;
    }
    const answer = selected.value;
    if (answer === questions[currentQuestion].answer) {
        score++;
        explanationDiv.textContent = "Correct! " + questions[currentQuestion].explanation;
        explanationDiv.style.display = "block";
    } else {
        explanationDiv.textContent = `Incorrect! The correct answer is ${questions[currentQuestion].answer}. ${questions[currentQuestion].explanation}`;
        explanationDiv.style.display = "block";
    }
    submitButton.style.display = "none";
    nextButton.style.display = "block";
});

function endQuiz() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
    document.getElementById("score").textContent = `Your score: ${score}/${questions.length}`;
    updateScoreboard(true);
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    playerName = "";
    document.getElementById("end-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
    document.getElementById("player-name").value = "";
    updateScoreboard();
}

updateScoreboard();