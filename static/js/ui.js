document.addEventListener('DOMContentLoaded', function() {
  const dropdownBtn = document.querySelector('.page__inform__dropdown__btn');
  const informList = document.querySelector('.page__inform__list');

  dropdownBtn.addEventListener('click', function() {
    informList.classList.toggle('is-open');
  });

  const informBtns = document.querySelectorAll('.page__inform__btn');
  
  informBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      informList.classList.remove('is-open');
    });
  });
});