const listContainer = document.getElementById('list');
const booksContainer = document.createElement('ul');
booksContainer.classList.add('books-list');

const books = [];

function removeBook(index) {
  books.splice(index, 1);
  window.localStorage.setItem('books', JSON.stringify(books));
}

function displayBooks() {
  booksContainer.innerHTML = '';
  for (let i = 0; i < this.books.length; i += 1) {
    const book = document.createElement('li');
    book.innerHTML = `<span class="title"> "${books[i].title}" by ${books[i].author}</span>`;
    const btn = document.createElement('button');
    btn.className = 'list-btn';
    btn.textContent = 'Remove';
    book.append(btn);
    btn.onclick = () => {
      removeBook(i);
      displayBooks();
    };
    booksContainer.append(book);
    listContainer.append(booksContainer);
  }
}

function addBook(title, author) {
  books.push({ title, author });
  displayBooks();
}

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
    addBook(title, author);
    thisForm[0].value = '';
    thisForm[1].value = '';
  }
  window.localStorage.setItem('books', JSON.stringify(books));
};