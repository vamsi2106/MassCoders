var prompt = require("prompt-sync")();
var {books, getBooks, getBooksByRatingRange, getBooksByAuthor , getBooksByTitle,getBooksById} = require("./books");


var state = { cmd: [] };

// Command handlers object
var commandHandlers = {
  books: () => getBooks(),
  priceMinMax: () => getBooksByRatingRange(parseInt(state.cmd[1]), parseInt(state.cmd[2])),
  authorBooks: ()=> getBooksByAuthor(state.cmd[1]),
  titleBooks: ()=> getBooksByTitle(state.cmd[1]),
  bookId: ()=> getBooksById(parseInt(state.cmd[1])),


  help: () => Object.keys(commandHandlers),
  exit: () => process.exit(),
};

function getPrompt() {
  var command = prompt(">");
  executeCommand(command);
}

function executeCommand(command) {
  command = command.split(" ");
  state.cmd = command;

  var cmd = command[0];

  // Check if the command exists in the commandHandlers object
  if (commandHandlers[cmd]) {
    console.log(commandHandlers[cmd]()); // Execute the corresponding handler
  } else {
    console.log("Could not find the command, try -help");
  }

  if (cmd !== "exit") {
    getPrompt();
  }
}

// Start the prompt loop
getPrompt();
