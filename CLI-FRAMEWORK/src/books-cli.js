const CLI = require("./cli");
const { booksList, bookOperations } = require("./books");
const { addBook, getBooks, getBookById, removeBook, updateBook } =
  bookOperations;

const cli = new CLI();

// Register command (command name, description, funciton)
cli.addCommand("create-book", "Creates a new book.", (args) => {
  if (args.length < 5) {
    cli.error("Usage: create-book <title> <author> <price> <rating> <tags>");
    return;
  }
  const [title, author, price, rating, tags] = args;
  const book = {
    title,
    author,
    price: parseFloat(price),
    rating: parseFloat(rating),
    tags,
  };
  addBook(book);
  cli.print(`Book added successfully ✅️`);
});

cli.addCommand("get-books", "Lists all books.", () => {
  const books = getBooks();

  books.forEach((book, index) => {
    cli.print(
      `Book-${index + 1}: Title: ${book.title} | Author: ${
        book.author
      } | Price: ${book.price} | Rating: ${book.rating} | Tags: ${
        book.tags
      } | id: ${book._id}`
    );
  });
  console.log();
});

cli.addCommand("get-books-author", "Lists all books by a author).", (args) => {
  if (args.length < 1) {
    cli.error("Usage: get-books-author <author>");
    return;
  }
  //get-books-author Vivek Dutta Mishra
  const author = args.join(" "); // Join arguments to handle names with spaces
  const books = getBooks();
  const filteredBooks = books.filter(
    (book) => book.author.toLowerCase() === author.toLowerCase()
  );

  if (filteredBooks.size() === 0) {
    cli.error(`No books found by author: ${author}`);
    return;
  }

  filteredBooks.forEach((book, index) => {
    cli.print(
      `Book-${index + 1}: Title: ${book.title} | Author: ${
        book.author
      } | Price: ${book.price} | Rating: ${book.rating} | Tags: ${book.tags}`
    );
  });
});

cli.addCommand("update-book", "Updates a book by ID.", (args) => {
  if (args.length < 3) {
    cli.error("Usage: update-book <id> <field> <value>");
    return;
  }
  const [id, field, value] = args;
  const book = getBookById(parseInt(id));
  if (book) {
    book[field] = isNaN(value) ? value : parseFloat(value);
    updateBook(book);
    cli.print(`Book updated successfully ✅️`);
  } else {
    cli.print(`No book found with ID: , ${id}`);
  }
});

cli.addCommand("delete-book", "Deletes a book by ID.", (args) => {
  if (args.length < 1) {
    cli.error("Usage: delete-book <id>");
    return;
  }
  const id = parseInt(args[0]);
  removeBook(id);
  cli.print(`Book deleted with ID: , ${id}`);
});

// Parse command-line arguments or start interactive mode
cli.print("📚 Welcome to the Mass-Coders Books CLI 📚");
cli.parseArgs();
