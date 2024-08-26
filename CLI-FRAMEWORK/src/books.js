var { LinkedList } = require("./list");
require("./list-extension");

var { matchers, generators, fill } = require("./matchers");
var { fixed, range } = generators;
var { match, contains, not, between, any, all, containsNoneOf, or } = matchers;

let booksList = new LinkedList(
  {
    title: "The Accursed God",
    author: "Vivek Dutta Mishra",
    price: 299,
    rating: 4.6,
    tags: "mahabharata,fiction,best-seller",
    _id: 1,
  },
  {
    title: "Rashmirathi",
    author: "Ramdhari Singh Dinkar",
    price: 99,
    rating: 4.4,
    tags: "mahabharata, hindi, classic, poetry",
    _id: 2,
  },
  {
    title: "Urvashi",
    author: "Ramdhari Singh Dinkar",
    price: 99,
    rating: 4.5,
    tags: "romance, hindi, classic, poetry",
    _id: 3,
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 199,
    rating: 4.8,
    tags: "self-help, best-seller",
    _id: 4,
  },
  {
    title: "Manas",
    author: "Vivek Dutta Mishra",
    price: 199,
    rating: 4.7,
    tags: "mahabharata, poetry, hindi",
    _id: 5,
  },
  {
    title: "Ajaya",
    author: "Anant Neelkantha",
    price: 450,
    rating: 3.8,
    tags: "mahabharata,fiction",
    _id: 6,
  },
  {
    title: "Jay",
    author: "Dev Dutt Pattanayak",
    price: 500,
    rating: 4.1,
    tags: "mahabharata,fiction",
    _id: 7,
  },
  {
    title: "Ashwatthama",
    author: "Deepak Kumar",
    price: 450,
    rating: 4.6,
    tags: "mahabharata, fiction",
    _id: 8,
  }
);

let _lastId = booksList.size();
const bookOperations = {
  // Method to add a book
  addBook(book) {
    _lastId += 1;
    book._id = _lastId;
    console.log("Adding book: ⌛");
    booksList.append(book);
  },

  // Method to get all books
  getBooks() {
    return booksList;
  },

  // Method to get a book by ID
  getBookById(id) {
    return booksList.find((b) => b._id == id);
  },

  // Method to remove a book by ID
  removeBook(id) {
    console.log("Deleting Book 📚");
    booksList = booksList.filter((b) => b._id !== id);
  },

  // Method to update a book
  updateBook(book) {
    console.log("Updating book: 🕛");
    booksList = booksList.map((b) => (b._id == book._id ? (b = book) : b));
  },
};

module.exports = {
  booksList,
  bookOperations,
};
