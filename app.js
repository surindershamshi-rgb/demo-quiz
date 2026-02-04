let currentIdx = 0;
let score = 0;

const questionEl = document.getElementById("question-text");
const answerSection = document.getElementById("answer-section");
const nextBtn = document.getElementById("next-btn");
const feedbackEl = document.getElementById("feedback");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score-display");

function startQuiz() {
    renderQuestion();
}

function renderQuestion() {
    const q = quizData[currentIdx];
    progressEl.innerText = `प्रश्न: ${currentIdx + 1}/${quizData.length}`;
    questionEl.innerText = q.question;
    answerSection.innerHTML = "";
    feedbackEl.innerText = "";
    nextBtn.classList.add("hidden");

    if (q.type === "mcq" || q.type === "objective") {
        q.options.forEach(opt => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.innerText = opt;
            btn.onclick = () => handleSelection(opt, btn);
            answerSection.appendChild(btn);
        });
    } else if (q.type === "fib") {
        const input = document.createElement("input");
        input.id = "fib-input";
        input.placeholder = "उत्तर यहाँ लिखें...";
        const submit = document.createElement("button");
        submit.id = "next-btn"; 
        submit.innerText = "जमा करें";
        submit.onclick = () => handleSelection(input.value, input);
        answerSection.appendChild(input);
        answerSection.appendChild(submit);
    }
}

function handleSelection(selected, element) {
    const q = quizData[currentIdx];
    const userAns = selected.trim();
    
    if (userAns === q.answer) {
        score++;
        scoreEl.innerText = `स्कोर: ${score}`;
        feedbackEl.innerHTML = "<span style='color:green'>सही! ✅</span>";
    } else {
        feedbackEl.innerHTML = `<span style='color:red'>गलत! सही उत्तर: ${q.answer} ❌</span>`;
    }

    nextBtn.classList.remove("hidden");
    // Prevent multiple clicks
    const btns = document.querySelectorAll(".option-btn");
    btns.forEach(b => b.disabled = true);
}

nextBtn.onclick = () => {
    currentIdx++;
    if (currentIdx < quizData.length) {
        renderQuestion();
    } else {
        document.getElementById("quiz-container").innerHTML = `<h2>क्विज़ समाप्त!</h2><p>आपका कुल स्कोर: ${score}/${quizData.length}</p><button onclick="location.reload()">दोबारा प्रयास करें</button>`;
    }
};

startQuiz();
