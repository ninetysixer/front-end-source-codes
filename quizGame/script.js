// Fetch questions from Open Trivia Database API
fetch("https://opentdb.com/api.php?amount=10")
  .then(response => response.json())
  .then(data => {
    const questions = data.results;
    let currentQuestion = 0;
    let score = 0;
    const userAnswers = [];

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const resultElement = document.getElementById("result");

    function displayQuestion() {

      const question = questions[currentQuestion];
      const questionNumber = currentQuestion + 1;
      questionElement.innerHTML = `Question ${questionNumber}: ${question.question}`;

      optionsElement.innerHTML = "";
      const options = question.incorrect_answers.concat(question.correct_answer);
      options.sort();

      options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.innerHTML = option;
        optionButton.addEventListener("click", () => selectAnswer(option));
        optionsElement.appendChild(optionButton);
      });
    }

    function selectAnswer(answer) {
      userAnswers[currentQuestion] = answer;
      currentQuestion++;

      if (currentQuestion < questions.length) {
        displayQuestion();
      } else {
        showSummary();
      }
    }

    function showSummary() {
      questionElement.style.display = "none";
      optionsElement.style.display = "none";

      let summaryHTML = "<h2>Summary of Answers:</h2>";
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const userAnswer = userAnswers[i];
        const isCorrect = userAnswer === question.correct_answer;
        const colorClass = isCorrect ? "correct" : "incorrect";

        summaryHTML += `
          <div>
            <p>Question ${i + 1}: ${question.question}</p>
            <p>Your Answer: <span class="${colorClass}">${userAnswer}</span></p>
        `;

        if (!isCorrect) {
          summaryHTML += `<p>Correct Answer: <span class="${colorClass}">${question.correct_answer}</span></p>`;
        }

        summaryHTML += `<hr></div>`;

        if (isCorrect) {
          score++;
        }
      }

      summaryHTML += `<h2>Score: ${score} out of ${questions.length}</h2>`;
      resultElement.innerHTML = summaryHTML;
    }

    displayQuestion();
  })
  .catch(error => {
    console.error("Error fetching questions:", error);
    document.getElementById("result").innerHTML = "Failed to fetch questions.";
  });
