function playBeep() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = 'sine'; // kannst du auch zu "square" ändern
  oscillator.frequency.value = 880; // Hz – Tonhöhe
  gainNode.gain.value = 0.1;

  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.2); // 0.2 Sekunden lang
}

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
        playBeep();  // ← Ton abspielen
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

button.addEventListener('click', () => {
  if (timer) {
    stopTimer();
  } else {
    startTimer();
  }
});

showExercise();

/* vorher definierte Funktionen... */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

