const addBtn = document.querySelector('.add_btn');
const removeBtn = document.querySelectorAll('.remove_btn');
const booksContainer = document.querySelector('.bookcards_container');
const overlay = document.querySelector('#overlay');
const popUpForm = document.querySelector('#pop-up-form');

let bookShelf = [];

addBtn.addEventListener('click', (e) => {
    overlay.classList.remove('hidden');
    setTimeout(function () {
        overlay.classList.remove('visually-hidden')
    }, 5)
})

overlay.addEventListener('click', (e) => {
    e.target.classList.add('visually-hidden');
    e.target.addEventListener('transitionend', function (e) {
        e.target.classList.add('hidden');
    }, {
        capture: false,
        once: true,
        passive: false
    });
})








console.log(addBtn.style.color)