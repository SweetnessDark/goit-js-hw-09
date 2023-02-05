import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTime = document.getElementById('datetime-picker');
const btnTime = document.querySelector('button[data-start]');

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    console.log(options.defaultDate)
    if(selectedDates[0] < options.defaultDate) {
      btnTime.disabled = true;
      Notify.failure('Please choose a date in the future', {
        timeout: 1000,
        width: '400px',
      });
    } else {
      btnTime.disabled = false;
    }
  },
};

const fp = flatpickr(dateTime, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

let timerId = null;

function startTimer() {
  const selectedDate = fp.selectedDates[0];
  
  timerId = setInterval(() => {
    const startTime = new Date();
    const countdown = selectedDate - startTime;
    btnTime.disabled = false;
    
    if (countdown < 0) {
      clearInterval(timerId);
      return;
    };

    updateTimer(convertMs(countdown));
  }, 1000);
}

btnTime.addEventListener("click", startTimer);

function updateTimer({ days, hours, minutes, seconds }) {
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
}
