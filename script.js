let input = document.getElementById("input");
let textDisplay = document.getElementById("text");
let stopped = false;
let totalCharsTyped = 0;


let easyTexts = [
`The sun rises in the east and sets in the west.
Practice typing daily to improve your speed.
Small efforts lead to big results over time.
Focus on accuracy before increasing speed.
Consistency helps you master typing skills.`,

`Typing is a useful skill in everyday life.
It helps in completing tasks quickly.
Practice makes your fingers move faster.
Try to reduce mistakes while typing.
Stay calm and keep practicing daily.`,

`Learning typing can be fun and easy.
Start with simple words and sentences.
Gradually increase your typing speed.
Accuracy is more important than speed.
Keep practicing to improve daily.`,

`Good typing skills save a lot of time.
It helps in studies and work tasks.
Always sit in a comfortable position.
Keep your eyes on the screen.
Practice regularly to improve speed.`,

`Typing faster requires regular practice.
Mistakes are part of the learning process.
Stay patient while learning new skills.
Keep challenging yourself every day.
You will see improvement over time.`
];

let mediumTexts = [
`Typing is an essential skill in the digital world.
Improving speed helps complete tasks efficiently.
Accuracy plays a key role in good typing.
Regular practice can improve performance.
Stay focused while typing to avoid errors.`,

`Technology has increased the need for fast typing.
Many jobs require good typing skills.
Practicing daily improves muscle memory.
Focus on both speed and accuracy.
Consistency is the key to success.`,

`Typing quickly helps in saving time.
It improves productivity in daily tasks.
Avoid looking at the keyboard often.
Train your fingers to move naturally.
Practice makes your typing smoother.`,

`Developing typing skills takes patience.
Start slow and build speed gradually.
Errors help you learn and improve.
Stay consistent with your practice.
Over time, your typing will improve.`,

`Typing efficiently is a valuable skill.
It helps in communication and work tasks.
Accuracy ensures fewer mistakes.
Practice regularly to gain confidence.
Keep improving your typing habits.`
];


let hardTexts = [
`Technology has transformed communication in modern society.
Typing efficiently is a valuable professional skill.
Speed and accuracy both matter in real-world tasks.
Regular practice enhances overall performance.
Consistency leads to long-term improvement.`,

`In today’s fast-paced world, typing is a crucial ability.
It improves productivity in both academic and professional work.
Maintaining accuracy while typing quickly is challenging.
Practice and patience help in mastering this skill.
Dedication leads to continuous improvement.`,

`Typing speed plays an important role in digital tasks.
Fast and accurate typing saves valuable time.
Developing this skill requires consistent effort.
Mistakes help identify areas of improvement.
Practice regularly to enhance your abilities.`,

`Efficient typing improves workflow and productivity.
It allows faster communication and data entry.
Accuracy ensures clarity and professionalism.
Regular training improves typing performance.
Stay focused and practice daily.`,

`Mastering typing requires discipline and persistence.
Balancing speed with accuracy is essential.
Continuous learning leads to improvement.
Practice sessions help refine typing skills.
Over time, expertise can be achieved.`
];



let selectedTexts = easyTexts;
let currentIndex = 0;

let time = 0;
let timer = null;
let started = false;


function loadParagraph() {
  textDisplay.innerText = selectedTexts[currentIndex];
  document.getElementById("progress").innerText =
    `Paragraph ${currentIndex + 1} / 5`;
}


function changeLevel() {
  let level = document.getElementById("level").value;

  if (level === "easy") selectedTexts = easyTexts;
  if (level === "medium") selectedTexts = mediumTexts;
  if (level === "hard") selectedTexts = hardTexts;

  currentIndex = 0;
  resetTest(false);
  loadParagraph();
}


input.addEventListener("input", () => {
  if (stopped) return;

  if (!started) {
    started = true;
    timer = setInterval(() => {
      time++;
      document.getElementById("time").innerText = time;
      calculate();
    }, 1000);
  }

  checkCompletion();
});


function calculate() {
  let userInput = input.value;
  let text = selectedTexts[currentIndex];

  let errors = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] !== text[i]) errors++;
  }

  let accuracy = ((text.length - errors) / text.length) * 100;
  accuracy = accuracy < 0 ? 0 : accuracy;
  document.getElementById("accuracy").innerText = Math.round(accuracy);

 
  let totalChars = totalCharsTyped + userInput.length;
let words = Math.floor(totalChars / 5);

document.getElementById("speed").innerText = words;
}

// Completion check
function checkCompletion() {
  let userInput = input.value
    .replace(/\s+/g, " ")
    .trim();

  let currentText = selectedTexts[currentIndex]
    .replace(/\s+/g, " ")
    .trim();

  
  if (userInput === currentText) {

    totalCharsTyped += currentText.length;

    if (currentIndex < selectedTexts.length - 1) {
      currentIndex++;
      input.value = "";
      loadParagraph();
    } else {
      stopTest();
      showResult();
    }
  }
}

// Stop
function stopTest() {
  clearInterval(timer);
  stopped = true;
}

// Continue
function continueTest() {
  if (!started) return;

  stopped = false;
  clearInterval(timer);

  timer = setInterval(() => {
    time++;
    document.getElementById("time").innerText = time;
    calculate();
  }, 1000);
}

function resetTest(show = true) {

  if (show && (totalCharsTyped > 0 || input.value.length > 0)) {
    showResult();
  }

  clearInterval(timer);
  timer = null;

  time = 0;
  started = false;
  stopped = false;

  input.value = "";

  document.getElementById("time").innerText = 0;
  document.getElementById("speed").innerText = 0;
  document.getElementById("accuracy").innerText = 100;

  totalCharsTyped = 0;
  currentIndex = 0;
  loadParagraph();
}

function showResult() {

  let totalChars = totalCharsTyped + input.value.length;
  let words = Math.round(totalChars / 5);
  let wpm = time > 0 ? Math.round((words / time) * 60) : 0;

  let accuracy = document.getElementById("accuracy").innerText;

  let message = "";

  if (wpm < 20) message = "You should improve your typing speed.";
  else if (wpm < 40) message = "Your typing speed is average.";
  else message = "Your typing speed is excellent!";

  fetch("http://localhost:5000/save", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({  username: currentUser,words, time, wpm, accuracy })
  });

  let resultHTML = `
    <h2>🎉 Completed!</h2>
    <p>Words: ${words}</p>
    <p>Time: ${time}s</p>
    <p>Speed: ${wpm} WPM</p>
    <p>Accuracy: ${accuracy}%</p>
    <p>${message}</p>
    <button onclick="closeResult()">Close</button>
  `;

  let box = document.getElementById("resultBox");
  box.innerHTML = resultHTML;
  box.style.display = "block";
}
function closeResult() {
  document.getElementById("resultBox").style.display = "none";
}

loadParagraph();

let currentUser = "";


function signup() {
  fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    })
  })
  .then(res => res.text())
  .then(data => alert(data));
}

function login() {
  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    })
  })
  .then(res => res.json())
  .then(data => {

    alert("Login response received"); 

    if (data.success) {
      currentUser = data.username;
      document.getElementById("login-box").style.display = "none";
      document.getElementById("app").style.display = "block";

    } else {
      alert("Login failed");
    }
  })
  .catch(() => {
    alert("Server not working");
  });
}