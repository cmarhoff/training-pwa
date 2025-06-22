// app.js – überarbeitete Version ohne Ton, aber mit größerem Button für besseren visuellen Wechsel

document.addEventListener("DOMContentLoaded", () => {
  let current = 0;
  let timer = null;
  let counter = 0;
  let countingUp = false;

  const exerciseDisplay = document.getElementById('exercise');
  const timeDisplay = document.getElementById('time');
  const button = document.getElementById('startBtn');

  function showExercise() {
    if (current >= exercises.length) {
      exerciseDisplay.textContent = "Fertig!";
      timeDisplay.textContent = "";
      button.style.display = "none";
      return;
    }
    const ex = exercises[current];
    exerciseDisplay.textContent = ex.name;
    timeDisplay.textContent = ex.duration > 0 ? ex.duration : "0";
    button.textContent = "Start";
    button.classList.remove("running");
    button.classList.add("ready");
    button.style.fontSize = "3rem";
    button.style.padding = "2rem 4rem";
  }

  function startTimer() {
    const ex = exercises[current];
    counter = ex.duration;
    countingUp = ex.duration === 0;
    button.classList.remove("ready");
    button.classList.add("running");
    button.textContent = "Stop";
    button.style.fontSize = "3rem";
    button.style.padding = "2rem 4rem";

    if (countingUp) {
      counter = 0;
      timeDisplay.textContent = counter;
      timer = setInterval(() => {
        counter++;
        timeDisplay.textContent = counter;
      }, 1000);
    } else {
      timeDisplay.textContent = counter;
      timer = setInterval(() => {
        counter--;
        timeDisplay.textContent = counter;
        if (counter <= 0) {
          stopTimer();
        }
      }, 1000);
    }
  }

  function stopTimer() {
    clearInterval(timer);
    timer = null;
    document.body.classList.add("flash");
    setTimeout(() => document.body.classList.remove("flash"), 600);
    current++;
    showExercise();
  }

  button.addEventListener('click', () => {
    console.log("BUTTON wurde geklickt!");

    if (timer) {
      stopTimer();
    } else {
      startTimer();
    }
  });

  showExercise();
});

