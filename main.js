const addBtn = document.querySelector('.add_btn');
const addBookBtn = document.querySelector('.add_new-book_btn')
const booksContainer = document.querySelector('.bookcards_container');
const overlay = document.querySelector('#overlay');
const popUpForm = document.querySelector('#pop-up-form');
let inputs = popUpForm.getElementsByTagName('input');

let bookShelf = [];

function Book(name, author, pages, readStatus) {
    this.name = name,
        this.author = author,
        this.pages = pages,
        this.readStatus = readStatus
}

function reloadBooksContainer() {
    booksContainer.innerHTML = ''
}

function appendBooksContainer(books) {
    reloadBooksContainer()
    let count = 0;
    books.forEach(book => {
        let cardExample = document.querySelector('.card');
        let cardEl = cardExample.cloneNode(true);
        cardEl.dataset.bookId = count;
        cardEl.children[0].textContent = book.name;
        cardEl.children[1].textContent = book.author;
        cardEl.children[2].children[0].textContent = book.pages
        cardEl.children[3].children[1].checked = book.readStatus;
        booksContainer.prepend(cardEl)
        count++;
    });
}

addBtn.addEventListener('click', (e) => {
    overlay.classList.remove('hidden');
    setTimeout(function () {
        overlay.classList.remove('visually-hidden')
    }, 5)
})

overlay.addEventListener('click', hideForm)
function hideForm() {
    overlay.classList.add('visually-hidden');
    overlay.addEventListener('transitionend', function (e) {
        overlay.classList.add('hidden');
    }, {
        capture: false,
        once: true,
        passive: false
    });
}

document.body.addEventListener('click', (Event) => {
    if (Event.target.classList.contains('card')){
        console.log(Event.target.dataset.bookId)
    }
    console.log(bookShelf)
})

booksContainer.addEventListener('click', (Event) => {
    if (Event.target.classList.contains('remove_btn')) {
        bookShelf.splice(+Event.target.parentElement.dataset.bookId, 1);
        Event.target.parentElement.remove();
        appendBooksContainer(bookShelf)
}
})

function clearFormInputs() {
    for (let i = 0; i < 3; ++i) {
        inputs[i].value = '';
    }
    inputs[3].checked = false;
}

popUpForm.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        let newTitle = inputs[0].value;
        let newAuthor = inputs[1].value;
        let newPagesNum = inputs[2].value;
        let newReadStatus = inputs[3].checked;
        if (newTitle !== '' && newAuthor !== '' && newPagesNum !== '') {
            let book = new Book(newTitle, newAuthor, newPagesNum, newReadStatus);
            bookShelf.push(book);
            clearFormInputs();
            hideForm();
            appendBooksContainer(bookShelf);
        } else {
            alert('Please enter all fields!')
        }
        e.preventDefault();
    }
    e.stopPropagation()
})






console.log(addBtn.style.color)