let books = [];
const book = document.getElementById('books-list');

function removebooks(index) {
  books.splice(index, 1);
  window.localStorage.setItem('books', JSON.stringify(books));
}

function displaybooks() {
  book.innerHTML = '';
  for (let i = 0; i < books.length; i += 1) {
    const booklist = document.createElement('li');
    booklist.innerHTML = `<span class="title">${books[i].title}</span> <br> ${books[i].author} <br>`
    const btn = document.createElement('button');
    const hrLine = document.createElement('hr');
    btn.textContent = 'Remove';
    booklist.append(btn);
    booklist.append(hrLine);
    btn.onclick = () => {
      removebooks(i);
      displaybooks();
    };
    book.append(booklist);
  }
};

function addBook(title, author) {
  books.push({ title, author });
  displaybooks();
}

document.forms[0].onsubmit = (event) => {
  event.preventDefault();
  const thisForm = event.target;
  const title = thisForm[0].value;
  const author = thisForm[1].value;
  addBook(title, author);
  window.localStorage.setItem('books', JSON.stringify(books));
};

window.onload = () => {
  if (localStorage.getItem('books')) {
    books = JSON.parse(localStorage.getItem('books'));
  }
  displaybooks();
};