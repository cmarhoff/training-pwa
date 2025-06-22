// app.js – überarbeitete Version mit 3-Spalten-Datenmodell und klarer Oberfläche

document.addEventListener("DOMContentLoaded", () => {
  let current = 0;
  let timer = null;
  let counter = 0;
  let countingUp = false;

  const exerciseDisplay = document.getElementById('exercise');
  const infoDisplay = document.getElementById('info');
  const timeDisplay = document.getElementById('time');
  const button = document.getElementById('startBtn');

  function showExercise() {
    if (current >= exercises.length) {
    exerciseDisplay.textContent = "Fertig!";
    infoDisplay.textContent = "";
    timeDisplay.textContent = "";
    button.style.display = "inline-block";
    button.textContent = "Neu starten";
    button.classList.remove("running", "ready");
    button.classList.add("ready");
    button.onclick = () => {
      current = 0;
      button.onclick = originalClickHandler;
      showExercise();
    };
    return;
    }
    const ex = exercises[current];

    exerciseDisplay.textContent = ex.name;
    infoDisplay.textContent = ex.display;
    timeDisplay.textContent = ex.initial;

    counter = ex.initial;
    countingUp = ex.initial === 0;

    button.textContent = "Start";
    button.classList.remove("running");
    button.classList.add("ready");
    button.style.fontSize = "3rem";
    button.style.padding = "2rem 4rem";
  }

  function startTimer() {
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

  const originalClickHandler = () => {
    if (timer) {
      stopTimer();
    } else {
      startTimer();
    }
  };
  button.addEventListener('click', originalClickHandler);

  showExercise();
});

