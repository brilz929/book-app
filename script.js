const addBookButton = document.getElementById("addBookBtn");
const cancelBtn = document.getElementById("cancelBtn");
const bookdialog = document.getElementById("bookDialog");


function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

const myLibrary = [
  new Book("The Hobbit", "J.R.R. Tolkien", 295, true),
  new Book("1984", "George Orwell", 328, false)
];


function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const bookContainer = document.querySelector(".book-container");
  bookContainer.innerHTML = ""; 

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card__content");
   
    // Fixed typo: titleElement
    const titleElement = document.createElement("h3");
    titleElement.classList.add("card__title");
    titleElement.textContent = book.title;
    cardContent.appendChild(titleElement); 

    const authorElement = document.createElement("p");
    authorElement.classList.add("card__author");
    authorElement.textContent = `Author: ${book.author}`;
    cardContent.appendChild(authorElement); 

    const pagesElement = document.createElement("p");
    pagesElement.classList.add("card__pages");
    pagesElement.textContent = `Pages: ${book.pages}`;
    cardContent.appendChild(pagesElement); 

    const buttonGroup = document.createElement("div");
  
    buttonGroup.classList.add("card__actions");
    buttonGroup.style.marginTop = "1rem";
    buttonGroup.style.display = "flex";
    buttonGroup.style.gap = "8px";

    const readStatusButton = document.createElement("button");
    readStatusButton.textContent = book.read ? "Read" : "Not Read";
    readStatusButton.addEventListener("click", () => {
      book.toggleReadStatus(); 
      displayBooks(); 
    });
    buttonGroup.appendChild(readStatusButton); 
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("card__delete-btn");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      const index = myLibrary.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1); 
        displayBooks(); 
      }
    });
    buttonGroup.appendChild(deleteButton); 

    cardContent.appendChild(buttonGroup);
    bookCard.appendChild(cardContent);
    bookContainer.appendChild(bookCard);
  });
}

addBookButton.addEventListener("click", () => {
  bookdialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  bookdialog.close();
});

const bookForm = document.getElementById("bookForm");
bookForm.addEventListener("submit", (event) => {
  event.preventDefault(); 
  
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("status").checked;

  addBookToLibrary(title, author, pages, read);
  bookdialog.close(); 
  bookForm.reset(); 
}); 

displayBooks();