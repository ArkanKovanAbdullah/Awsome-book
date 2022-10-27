const listContainer = document.getElementById('list');
const booksContainer = document.createElement('ul');
booksContainer.classList.add('books-list');
const lists = document.getElementById('container');
const container = document.getElementById('form-section');
const contact = document.getElementById('contact');

const books = [];

function removeBook(index) {
  books.splice(index, 1);
  window.localStorage.setItem('books', JSON.stringify(books));
}

document.getElementById('nav-list').addEventListener('click', () => {
  lists.style.display = 'flex';
  container.style.display = 'none';
  contact.style.display = 'none';
});

function displayBooks() {
  booksContainer.innerHTML = '';
  for (let i = 0; i < books.length; i += 1) {
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

document.getElementById('nav-add').addEventListener('click', () => {
  container.style.display = 'block';
  lists.style.display = 'none';
  contact.style.display = 'none';
});

function addBook(title, author) {
  books.push({ title, author });
  displayBooks();
}

document.getElementById('nav-contact').addEventListener('click', () => {
  container.style.display = 'none';
  lists.style.display = 'none';
  contact.style.display = 'block';
});

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

function refreshTime() {
  const timeDisplay = document.getElementById('time');
  const dateString = new Date().toLocaleString();
  const formattedString = dateString.replace(', ', ' - ');
  timeDisplay.textContent = formattedString;
}
setInterval(refreshTime, 1);