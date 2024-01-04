const Library = (function () {
  const books = []

  // New objects creation
  class Book {
    constructor(name, author, pages, read) {
      this.name = name
      this.author = author
      this.pages = pages
      this.read = read
    }
    changeReadStatus() {
      if (this.read) {
        this.read = false
      } else this.read = true
    }
  }

  // Cache DOM
  const libraryDOM = document.querySelector('#library_module')
  const addBtn = libraryDOM.querySelector('.add_btn')
  const booksContainer = libraryDOM.querySelector('.bookcards_container')
  const overlay = libraryDOM.querySelector('#overlay')
  const popUpForm = libraryDOM.querySelector('#pop-up-form')
  const nameFormInput = popUpForm.querySelector('#new-title')
  const authorFormIput = popUpForm.querySelector('#new-author')
  const bookCardTemplate =
    libraryDOM.querySelector('.card-template').children[0]

  _render()
  // Bind Events
  addBtn.addEventListener('click', _showPopUpForm)
  overlay.addEventListener('click', _handleOverlay)
  booksContainer.addEventListener('click', _handleContainer)
  popUpForm.addEventListener('submit', _handleForm)

  // Private methods
  function _render() {
    booksContainer.innerHTML = ''
    books.forEach((book) => {
      let cardEl = bookCardTemplate.cloneNode(true)
      cardEl.children[0].textContent = book.name
      cardEl.children[1].textContent = book.author
      cardEl.children[2].children[0].textContent = book.pages
      cardEl.children[3].children[1].checked = book.read
      booksContainer.append(cardEl)
    })
  }

  function _showPopUpForm() {
    overlay.classList.remove('hidden')
    setTimeout(function () {
      overlay.classList.remove('visually-hidden')
    }, 5)
  }

  function _hideOverlay() {
    overlay.classList.add('visually-hidden')
    overlay.addEventListener(
      'transitionend',
      function (e) {
        overlay.classList.add('hidden')
      },
      {
        capture: false,
        once: true,
        passive: false,
      }
    )
  }

  function _handleOverlay(Event) {
    if (Event.target.closest('#pop-up-form')) return
    _hideOverlay()
  }

  function _checkValidity() {
    let result = true
    const inputs = popUpForm.querySelectorAll('input[type="text"]')
    inputs.forEach((el) => {
      const errorSpan = popUpForm.querySelector(`span[data-error='${el.name}']`)
      if (el.validity.valueMissing) {
        _showError(errorSpan)
        result = false
      } else {
        errorSpan.textContent = ''
        errorSpan.className = 'error'
      }
    })
    return result
  }

  function _showError(errorSpan) {
    errorSpan.textContent = 'You need to fill out this field.'
    errorSpan.className = 'error active'
  }

  function _handleForm(e) {
    e.preventDefault()
    if (!_checkValidity()) return
    const inputsData = [...popUpForm.querySelectorAll('input')].map((el) => {
      if (el.type === 'checkbox') return el.checked
      return el.value
    })
    addBook(...inputsData)
    _hideOverlay()
  }

  function _handleContainer(e) {
    let el = e.target.closest('.card')
    let index = Array.from(booksContainer.children).indexOf(el)
    let cardInteraction = e.target.classList[0]
    switch (cardInteraction) {
      case 'remove_btn':
        deleteBook(index)
        break
      case 'status_checkbox':
        books[index].changeReadStatus()
        break
    }
  }

  // Public methods
  function addBook(name, author, pages, status) {
    if (arguments.length < 4) throw Error('Wrong input!')
    books.push(new Book(...arguments))
    _render()
    return books
  }
  function deleteBook(index) {
    books.splice(index, 1)
    _render()
    return books
  }
  return { addBook, deleteBook }
})()
