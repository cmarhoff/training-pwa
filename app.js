// app.js – Trainingsablauf und Synchronisation der Übungsanimation

document.addEventListener("DOMContentLoaded", () => {
  let current = 0;
  let timer = null;
  let counter = 0;
  let countingUp = false;

  const exerciseDisplay = document.getElementById('exercise');
  const infoDisplay = document.getElementById('info');
  const timeDisplay = document.getElementById('time');
  const button = document.getElementById('startBtn');
  const restartButton = document.getElementById('restartBtn');

  function showExercise() {
    if (current >= exercises.length) {
      stopExerciseAnimation();
      exerciseDisplay.textContent = "Fertig!";
      infoDisplay.textContent = "";
      timeDisplay.textContent = "";
      button.style.display = "none";
      restartButton.style.display = "inline-block";
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

    startExerciseAnimation(ex.animation);
  }

  function startTimer() {
    button.classList.remove("ready");
    button.classList.add("running");
    button.textContent = "Stop";

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
    if (timer) {
      stopTimer();
    } else {
      startTimer();
    }
  });

  restartButton.addEventListener('click', () => {
    current = 0;
    restartButton.style.display = "none";
    button.style.display = "inline-block";
    showExercise();
  });

  showExercise();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .catch(error => console.log("Service Worker konnte nicht registriert werden:", error));
  }
});
