var CLI = require('./cli');
var { getAllBooks,getBookById,removeBookById,removeManyBookBy,insertBook,updateBook} = require('./books');
var {disconnect} = require('./connection');

var app = new CLI("Book's CLI",{close:disconnect});

app.addCommand(getAllBooks, "books","Get a list of all authors", "get-books","books-list");

app.addCommand(getBookById, "book","Get an author by ID", "get","book-info");

app.addCommand(removeBookById, "book-remove","Get an Delite Count", "remove-book");

app.addCommand(removeManyBookBy, "remove-books","Get an Delited Count", "remove-many");

app.addCommand(insertBook, "insert-book","Get an add author-book", "add author-book");

app.addCommand(updateBook, "update-book","Get an update book", "update book");

app.run();

// node authors-cli author "charles-dickens"