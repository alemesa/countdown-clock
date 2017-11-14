console.log('This is the timer scripts ⏲️');

let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const timezones = document.querySelectorAll('[data-utc]');
const current = document.querySelector('.display__time-now');

function getLocalTimeZone() {
  let now = new Date();
  let localUTC = -(now.getTimezoneOffset() / 60);
  return localUTC;
}

function currentTime() {
  setInterval(() => {
    const now = new Date(); // current time
    const seconds =
      now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
    const minutes =
      now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();

    const hour = now.getHours() > 12 ? now.getHours() % 12 : now.getHours();
    const ampm = now.getHours() > 11 ? 'PM' : 'AM';
    const display = `${hour == 0 ? 12 : hour}:${minutes}:${seconds} ${ampm}`;

    current.textContent = display;
  }, 1000);
}

document.addEventListener('DOMContentLoaded', currentTime);

function timer(seconds) {
  //clear existing timers
  clearInterval(countdown);

  const now = Date.now(); // current time
  const then = now + seconds * 1000; // future time
  displayTimeLeft(seconds); // invoke function to shwow first number
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if stop
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  if (remainderSeconds < 10) {
    remainderSeconds = '0' + remainderSeconds;
  }
  const display = `${minutes}:${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = `${display} ⏰`;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  let hours = end.getHours() > 12 ? end.getHours() % 12 : end.getHours();

  let minutes =
    end.getMinutes() < 10 ? '0' + end.getMinutes() : end.getMinutes();
  let ampm = end.getHours() > 11 ? 'PM' : 'AM';

  const display = `Be back At ${hours == 0 ? 12 : hours}:${minutes} ${ampm}`;
  endDisplay.textContent = display;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  this.reset();
  timer(mins * 60);
});
