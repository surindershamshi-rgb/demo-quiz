let currentIdx = 0;
let score = 0;

function loadQuestion() {
  const q = quizData[currentIdx];
  document.getElementById("question-text").innerText = q.question;
  const section = document.getElementById("answer-section");
  section.innerHTML = ""; // Clear old options

  if (q.type === "mcq" || q.type === "objective") {
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.innerText = opt;
      btn.onclick = () => checkAnswer(opt);
      section.appendChild(btn);
    });
  } else if (q.type === "fib") {
    const input = document.createElement("input");
    input.id = "fib-input";
    input.placeholder = "उत्तर यहाँ लिखें...";
    section.appendChild(input);
  }
}

function checkAnswer(selected) {
  const q = quizData[currentIdx];
  let userAns = selected;
  
  if (q.type === "fib") {
    userAns = document.getElementById("fib-input").value.trim();
  }

  if (userAns === q.answer) {
    score++;
    alert("सही जवाब! 🎉");
  } else {
    alert(`गलत! सही उत्तर है: ${q.answer}`);
  }
  nextQuestion();
}

function nextQuestion() {
  currentIdx++;
  if (currentIdx < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz-container").innerHTML = `<h2>क्विज़ समाप्त!</h2><p>आपका स्कोर: ${score}/${quizData.length}</p>`;
  }
}

loadQuestion();
