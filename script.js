
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
  bookContainer.innerHTML = ""; // Clear the container before displaying books

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card", "book-card");

    const titleElement = document.createElement("h3");
    titleElement.textContent = book.title;
    bookCard.appendChild(titleElement);

    const authorElement = document.createElement("p");
    authorElement.classList.add("card__author");
    authorElement.textContent = `Author: ${book.author}`;
    bookCard.appendChild(authorElement);

    const pagesElement = document.createElement("p");
    pagesElement.classList.add("card__pages");
    pagesElement.textContent = `Pages: ${book.pages}`;
    bookCard.appendChild(pagesElement);

    const readStatusButton = document.createElement("button");
    readStatusButton.textContent = book.read ? "Read" : "Not Read";
    readStatusButton.addEventListener("click", () => {
      book.toggleReadStatus(); // Toggle the read status
      displayBooks(); // Update the display
    });
    bookCard.appendChild(readStatusButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("card__delete-btn");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      const index = myLibrary.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1); // Remove the book from the array
        displayBooks(); // Update the display
      }
    });
    bookCard.appendChild(deleteButton);
    
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
  event.preventDefault(); // Prevent form submission
  
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("status").checked;

  addBookToLibrary(title, author, pages, read);
  bookdialog.close(); // Close the dialog after adding the book
  bookForm.reset(); // Reset the form fields
}); 

displayBooks(); // Initial display of books





