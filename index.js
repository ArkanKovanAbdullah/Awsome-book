const listContainer = document.getElementById('list');
const booksContainer = document.createElement('ul');
booksContainer.classList.add('books-list');

class Collect {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('storedBooks')) || []; 
  }

  removeBook(index) {
    this.books.splice(index, 1);
    window.localStorage.setItem('storedBooks', JSON.stringify(this.books));
  }

  displayBooks() {
    booksContainer.innerHTML = '';
    for (let i = 0; i < this.books.length; i += 1) {
      const book = document.createElement('li');
      book.className = 'book-list';
      book.innerHTML = `<span class="title"> "${this.books[i].title}" by ${this.books[i].author}</span>`;
      const btn = document.createElement('button');
      btn.className = 'list-btn';
      btn.textContent = 'Remove';
      book.append(btn);
      btn.onclick = () => {
        this.removeBook(i);
        this.displayBooks();
      };
      booksContainer.append(book);
      listContainer.append(booksContainer);
    }
  }

  addBook(title, author) {
    this.books.push({ title, author });
    this.displayBooks();
  }
}

const bookie = new Collect();
bookie.displayBooks();

document.forms[0].onsubmit = (event) => {
  event.preventDefault();
  const thisForm = event.target;
  const title = thisForm[0].value;
  const author = thisForm[1].value;

  if (title === '' || author === '') {
    const section = document.getElementById('form-section');
    const message = document.createElement('p');
    message.innerHTML = 'Please put something into the fields';
    section.insertAdjacentElement('afterend', message);
    setTimeout(() => { message.remove(); }, 3000);
  } else {
    bookie.addBook(title, author);
    thisForm[0].value = '';
    thisForm[1].value = '';
  }
  window.localStorage.setItem('storedBooks', JSON.stringify(bookie.books));
};

const listOfBooksOnScreen = document.getElementById('list');
const addNewBookForm = document.getElementById('form-section');
const listBtn = document.getElementById('list-btn');
const addNewBtn = document.getElementById('add-new-btn');
const contact = document.getElementById('contact');
const contactBtn = document.getElementById('contact-btn');
const addBookForm = document.querySelector('books-form');

listBtn.addEventListener('click', () =>{
  listOfBooksOnScreen.classList.remove('display-none');
  addNewBookForm.classList.add('display-none');
  contact.classList.add('display-none')
})

addNewBtn.addEventListener('click', () =>{
  listOfBooksOnScreen.classList.add('display-none');
  addNewBookForm.classList.remove('display-none');
  contact.classList.add('display-none')
})

contactBtn.addEventListener('click', () =>{
  listOfBooksOnScreen.classList.add('display-none');
  addNewBookForm.classList.add('display-none');
  contact.classList.remove('display-none')
})