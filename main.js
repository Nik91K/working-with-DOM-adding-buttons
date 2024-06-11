let mainBtn = document.querySelector('.main-btn');
let mainForm = document.querySelector('.main-form');
let formBtn = document.querySelector('.form-btn');

mainBtn.addEventListener('click', () => {
  mainForm.classList.add('active');
});
// щоб браузер не оновлювався
formBtn.addEventListener('click', (e) => {
  e.preventDefault();
  mainForm.classList.remove('active');
});