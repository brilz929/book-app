/* book objects need to be store in array 
  function that can take argumnts, create a book from arguments, store in array, book should have unique Id (crypto.randomUUID())

  Example code: 
  const myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // take params, create a book then store it in the array

  write function that loops through array/displays each book.
  Add new book button that will bring up a form to add a new book: author, title, pages, read status (checkbox).
  Add a button to each book that will remove it from the array and update the display.
  Add a button on each book’s display to change its read status.
    To facilitate this you will want to create Book prototype function that toggles a book instance’s read status.

}
*/

const addBookButton = document.getElementById("addBookBtn");
const cancelBtn = document.getElementById("cancelBtn");
const bookdialog = document.getElementById("bookDialog");

const myLibrary = [];

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

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const bookContainer = document.querySelector(".bookContainer");
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

deleteBookButton.addEventListener("click", () => {
  bookdialog.close();
});

const bookForm = document.getElementById("bookForm");
bookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission
  
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("hasRead").checked;

  addBookToLibrary(title, author, pages, read);
  bookdialog.close(); // Close the dialog after adding the book
  bookForm.reset(); // Reset the form fields
}); 





