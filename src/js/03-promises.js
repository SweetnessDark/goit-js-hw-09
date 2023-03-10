import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');

form.addEventListener('submit', onCreatePromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  }).then(() => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
  }).catch(() => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
  })
}

function onCreatePromise(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = Number(value);
  }

  let { delay, step, amount } = data;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay);
    
    delay = delay + step;
    
    form.reset();
  }
}
