import * as utils from './utils.js';
'use strict';



const currentTimeElement = utils.select('.current-time');
const targetTimeElement = utils.select('.target-time');
const hourInputElement = utils.select('input[name="hourInput"]');
const minuteInputElement = utils.select('input[name="minuteInput"]');
const formElement = utils.select('form');
const validationTextElement = utils.select('.validation-text');
const targetTimeContainer = utils.select('.target-time-container');


const currentTime = new Date();
currentTimeElement.textContent = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
// Update the current time every second
setInterval(() => {
  const currentTime = new Date();
  currentTimeElement.textContent = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}, 1000);

let currentAlarm = null;

utils.listen('submit', formElement, (event) => {
  event.preventDefault();

  // Validation that ensures that the input fields aren't empty
  if (!hourInputElement.value || !minuteInputElement.value) {
    validationTextElement.style.visibility = 'visible';
    return;
  } else {
    validationTextElement.style.visibility = 'hidden';
  }

  // show the bell and the target time 
  targetTimeContainer.style.display = 'flex';

  const now = new Date();
  const target = new Date(now.getTime());
  target.setHours(parseInt(hourInputElement.value, 10));
  target.setMinutes(parseInt(minuteInputElement.value, 10));
  target.setSeconds(0);
  // if the target time is before the current time, it sets the alarm to the target time of the NEXT day
  if (target < now) {
    target.setDate(target.getDate() + 1);
  }

  const diff = target.getTime() - now.getTime();

  targetTimeElement.textContent = `${hourInputElement.value.padStart(2, '0')}:${minuteInputElement.value.padStart(2, '0')}`;

  // If there's an alarm running rn, clear it.
  if (currentAlarm !== null) {
    clearTimeout(currentAlarm);
  }

  // Set the new alarm
  currentAlarm = setTimeout(function() {
    let audio = new Audio('./assets/media/wakey.mp3');
    audio.play();
    hourInputElement.value = '';
    minuteInputElement.value = '';
    targetTimeContainer.style.display = 'none';
  }, diff);
});

/* ====================================VALIDATION==================================== */


function validation(event) {
  // makes it so that the input can only be numbers. Evan sent me this.
  event.target.value = event.target.value.replace(/[^0-9]/g, '');

  // Check if the input field is hourInputElement or minuteInputElement
  if (event.target === hourInputElement) {
    // If the input is hourInputElement, ensure the value is between 0 and 23
    if (event.target.value < 0) {
      event.target.value = 0;
    } else if (event.target.value > 23) {
      event.target.value = 23;
    }
  } else if (event.target === minuteInputElement) {
    // If the input is minuteInputElement, ensure the value is between 0 and 59
    if (event.target.value < 0) {
      event.target.value = 0;
    } else if (event.target.value > 59) {
      event.target.value = 59;
    }
  }
}
utils.listen('input', hourInputElement, validation);
utils.listen('input', minuteInputElement, validation);

// when you refresh the page, this removes the values in the input fields (if there's any) and hide the bell and the target time
window.onload = function() {
  hourInputElement.value = '';
  minuteInputElement.value = '';

  targetTimeContainer.style.display = 'none';
};