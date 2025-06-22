// app.js – überarbeitete Version mit iPhone-kompatiblem Beep

document.addEventListener("DOMContentLoaded", () => {
  let current = 0;
  let timer = null;
  let counter = 0;
  let countingUp = false;
  let audio = null;

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
  }

  function startTimer() {
    const ex = exercises[current];
    counter = ex.duration;
    countingUp = ex.duration === 0;
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
          playBeep();
          stopTimer();
        }
      }, 1000);
    }
  }

  function stopTimer() {
    clearInterval(timer);
    timer = null;
    current++;
    showExercise();
  }

  function playBeep() {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.log("Ton konnte nicht abgespielt werden:", e));
    }
  }

  button.addEventListener('click', () => {
    console.log("BUTTON wurde geklickt!");
    // iOS Safari: Audio muss zuerst "entsperrt" werden
    if (!audio) {
      audio = new Audio('beep.mp3');
      audio.play().then(() => {
        audio.pause();
        audio.currentTime = 0;
      }).catch(e => console.log("Audio-Vorbereitung fehlgeschlagen:", e));
    }

    if (timer) {
      stopTimer();
    } else {
      startTimer();
    }
  });

  showExercise();
});

