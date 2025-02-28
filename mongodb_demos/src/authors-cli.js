var CLI = require('./cli');
var {getAllAuthors,getAuthorById,removeAuthorById,removeManyAuthorBy,insertAuthor,updateAuthor} = require('./authors');
var {disconnect} = require('./connection');

var app = new CLI("Author's CLI",{close:disconnect});
app.addCommand(getAllAuthors, "authors","Get a list of all authors", "get-authors","authors-list");

app.addCommand(getAuthorById, "author","Get an author by ID", "get-author","author-info");

app.addCommand(removeAuthorById, "author-remove","Get an Delite Count", "remove-author","author-info");

app.addCommand(removeManyAuthorBy, "remove-many","Get an Delited Count", "remove-many");

app.addCommand(insertAuthor, "insert-author","Get an add author-book", "add author-book");

app.addCommand(updateAuthor, "update-author","Get an update author", "Get an update author");

app.run();

// node authors-cli author "charles-dickens"