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
Book.prototype.changeReadStatus = function () {
    if (this.readStatus) {
        this.readStatus = false;
    } else {
        this.readStatus = true;
    }
}

function reloadBooksContainer() {
    booksContainer.innerHTML = ''
}

function appendBooksContainer(books) {
    reloadBooksContainer()
    let bookIdCount = 0;
    books.forEach(book => {
        let cardExample = document.querySelector('.card');
        let cardEl = cardExample.cloneNode(true);
        cardEl.dataset.bookId = bookIdCount;
        cardEl.children[0].textContent = book.name;
        cardEl.children[1].textContent = book.author;
        cardEl.children[2].children[0].textContent = book.pages
        cardEl.children[3].children[1].checked = book.readStatus;
        booksContainer.prepend(cardEl)
        bookIdCount++;
    });
}

function clearFormInputs() {
    for (let i = 0; i < 3; ++i) {
        inputs[i].value = '';
    }
    inputs[3].checked = false;
}

function addBookToLibrary(name, author, pages, readStatus) {
    if (name !== '' && author !== '' && pages !== '') {
        let book = new Book(name, author, pages, readStatus);
        bookShelf.push(book);
        clearFormInputs();
        hideForm();
        appendBooksContainer(bookShelf);
    } else {
        alert('Please enter all fields!')
    }
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

booksContainer.addEventListener('click', (Event) => {
    let cardInteraction = Event.target.classList[0];
    switch (cardInteraction) {
        case 'remove_btn':
            bookShelf.splice(+Event.target.parentElement.dataset.bookId, 1);
            Event.target.parentElement.remove();
            appendBooksContainer(bookShelf)
            break;
        case 'status_checkbox':
            bookShelf[Event.target.parentElement.parentElement.dataset.bookId].changeReadStatus()
            break;
    }
})

popUpForm.addEventListener('click', (e) => {
    if (e.target.classList.contains('add_new-book_btn')) {
        addBookToLibrary(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].checked);
        e.preventDefault();
    }
    e.stopPropagation()
})