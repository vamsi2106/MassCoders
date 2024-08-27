var CLI = require('./cli');
var { getAllBooks,getBookById,removeBookById,removeAllBooks,insertBook} = require('./books');
var {disconnect} = require('./connection');

var app = new CLI("Book's CLI",{close:disconnect});

app.addCommand(getAllBooks, "books","Get a list of all authors", "get-books","books-list");

app.addCommand(getBookById, "book","Get an author by ID", "get-book","book-info");

app.addCommand(removeBookById, "remove","remove-book", "remove-book-by-Id","remove-by-Id");

app.addCommand(removeAllBooks, "remove-all","remove-books", "remove-many","remove books","remove-all-books");

app.addCommand(insertBook, "insert-book","Get an add author-book", "add author-book");

//app.addCommand(updateBook, "update-book","Get an update book", "Get an update book");

app.run();

