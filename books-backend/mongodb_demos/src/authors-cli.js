var CLI = require("./cli");
var {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("./authors");
var { disconnect } = require("./connection");

var app = new CLI("Author's CLI", { close: disconnect });

// app.addCommand(func, cmdName, des, aliases);

app.addCommand(
  getAllAuthors,
  "authors",
  "Get a list of all authors",
  "get-authors",
  "authors-list"
);

app.addCommand(
  getAuthorById,
  "author",
  "Get an author by ID",
  "get-author",
  "author-info"
);

app.addCommand(
  createAuthor,
  "create-author",
  "Create a new author",
  "add-author",
  "author-add"
);
app.addCommand(
  updateAuthor,
  "update-author",
  "Update an existing author",
  "edit-author",
  "author-edit"
);
app.addCommand(
  deleteAuthor,
  "delete-author",
  "Delete an author by ID",
  "remove-author",
  "author-remove"
);

app.run();
