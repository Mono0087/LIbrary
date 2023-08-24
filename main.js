const Library = (function () {
    const books = [];

    // New objects creation
    const _bookFactory = function (name, author, pages, read) {
        function changeReadStatus() {
            if (this.read) {
                this.read = false;
            } else this.read = true;
        }
        return { name, author, pages, read, changeReadStatus }
    }

    // Cache DOM
    const libraryDOM = document.querySelector('#library_module');
    const addBtn = libraryDOM.querySelector('.add_btn');
    const booksContainer = libraryDOM.querySelector('.bookcards_container');
    const overlay = libraryDOM.querySelector('#overlay');
    const popUpForm = libraryDOM.querySelector('#pop-up-form');
    const addNewBookBtn = popUpForm.querySelector('#add_new-book_btn');
    const bookCardTemplate = libraryDOM.querySelector('.card-template').children[0];

    _render();
    // Bind Events
    addBtn.addEventListener('click', _showPopUpForm);
    overlay.addEventListener('click', _hidePopUpForm);
    popUpForm.addEventListener('click', _handleForm);
    booksContainer.addEventListener('click', _handleContainer);

    // Private methods
    function _render() {
        booksContainer.innerHTML = '';
        books.forEach(book => {
            let cardEl = bookCardTemplate.cloneNode(true);
            cardEl.children[0].textContent = book.name;
            cardEl.children[1].textContent = book.author;
            cardEl.children[2].children[0].textContent = book.pages
            cardEl.children[3].children[1].checked = book.read;
            booksContainer.append(cardEl);
        });
    }
    function _showPopUpForm() {
        overlay.classList.remove('hidden');
        setTimeout((function () {
            overlay.classList.remove('visually-hidden');
        }), 5)
    }
    function _hidePopUpForm() {
        overlay.classList.add('visually-hidden');
        overlay.addEventListener('transitionend', function (e) {
            overlay.classList.add('hidden');
        }, {
            capture: false,
            once: true,
            passive: false
        });
    }
    function _handleForm(e) {
        if (e.target === addNewBookBtn) {
            let inputsData = [...popUpForm.querySelectorAll('input')].map((el) => {
                if (el.type === 'checkbox') return el.checked;
                return el.value;
            })
            addBook(...inputsData);
            _hidePopUpForm();
            e.preventDefault();
        }
        e.stopPropagation();
    }
    function _handleContainer(e) {
        let el = e.target.closest('.card');
        let index = Array.from(booksContainer.children).indexOf(el);
        let cardInteraction = e.target.classList[0];
        switch (cardInteraction) {
            case 'remove_btn':
                deleteBook(index);
                break;
            case 'status_checkbox':
                books[index].changeReadStatus();
                break;
        }
    }

    // Public methods
    function addBook(name, author, pages, status) {
        if (arguments.length < 4) throw Error('Wrong input!')
        books.push(_bookFactory(...arguments))
        _render();
        return books;
    }
    function deleteBook(index) {
        books.splice(index, 1);
        _render();
        return books;
    }
    return { addBook, deleteBook}
})()
