var {BookManager} = require("./books.maneger");
var book = new BookManager();
console.log(book.getBooksByTitle)

const [,, ...args] = process.argv;

const command = args[0];
const params = args.slice(1);

function displayOutPut(outPut){
    console.log(outPut)
}

const commands = {
    getAllBooks: {
        description: 'Get all books in the books-manager',
        execute: () => {
            displayOutPut(book.getBooks());
        },
    },
    getBookById: {
        description: 'get book by books-manager',
        execute: (params) => {
            var id = parseInt(params[0]);
            displayOutPut(book.getBookById(id));
        },
    },
    getBooksByPriceRange: {
        description: 'get books by price range',
        execute: (params) => {
            var min= parseInt(params[0]);
            var max = parseInt(params[1]);
            displayOutPut(book.getBooksByPriceRange(min,max));
        },
    },
    getBooksByRatingRange: {
        description: 'get books by rating range',
        execute: (params) => {
            var min= parseInt(params[0]);
            var max = parseInt(params[1]);
            displayOutPut(book.getBooksByRatingRange(min,max));
        },
    },
    getBooksByTitle: {
        description: 'get book by title',
        execute: (params) => {
            var title = params[0];
            displayOutPut(book.getBooksByTitle(title));
        },
    },
    getBooksByAuthor: {
        description: 'get books by author',
        execute: (params) => {
            var name= params[0];
            displayOutPut(book.getBooksByAuthor(name));
        },
    },
    removeBook: {
        description: 'remove the book from books-manager',
        execute: (params) => {
            var id = parseInt(params[0]);
            displayOutPut(book.removeBook(id));
        },
    },
    conatians: {
        description: 'remove the book from books-manager',
        execute: (params) => {
            var name = params[0];
            displayOutPut(book.conatians(name));
        },
    },
    startWithTitle: {
        description: 'remove the book from books-manager',
        execute: (params) => {
            var name = params[0];
            displayOutPut(book.startWithTitle(name));
        },
    },
    endsWithTitle: {
        description: 'remove the book from books-manager',
        execute: (params) => {
            var name = params[0];
            displayOutPut(book.endsWithTitle(name));
        },
    },
    updateBook: {
        description: 'update the book in books-manager',
        execute: (params) => {
            displayOutPut(book.updateBook(...params));
        },
    },
    greet: {
        description: 'Greet a person by name',
        execute: (params) => {
            if (params.length < 1) {
                console.error('Error: Please provide a name.');
                process.exit(1);
            }
            const name = params[0];
            displayOutPut(name);
        },
    },
    add: {
        description: 'Add two numbers',
        execute: (params) => {
            if (params.length < 2) {
                console.error('Error: Please provide two numbers.');
                process.exit(1);
            }
            const [a, b] = params.map(Number);
            if (isNaN(a) || isNaN(b)) {
                console.error('Error: Both arguments must be numbers.');
                process.exit(1);
            }
            displayOutPut(a + b);
        },
    },
    help: {
        description: 'Show help for available commands',
        execute: () => {
            console.log('Available commands:');
            console.log('  greet <name>           - Greet a person by name');
            console.log('  add <num1> <num2>      - Add two numbers');
            console.log('  help                   - Show this help message');
            console.log('  exit                   - Exit the CLI');
            console.log('  getAllBooks            - Get All Books');
            console.log('  getBookById            - Get All Books');
            console.log('  getBooksByPriceRange   - Get All Books');
            console.log('  getBooksByRatingRange  - Get All Books');
            console.log('  getBooksByTitle        - Get All Books');
            console.log('  getBooksByAuthor       - Get All Books');
            console.log('  contains               - Get All Books');
            console.log('  endsWithTitle          - Get All Books');
            console.log('  startsWithTitle        - Get All Books');
            console.log('  removeBooj             - Get All Books');
        },
    },
    exit: {
        description: 'Exit the CLI',
        execute: () => {
            process.exit();
        },
    },
};


  if (commands[command]) {
    commands[command].execute(params);
  } else {
    console.error('Error: Unknown command.');
    console.error('Usage:');
    commands.help.execute(); 
    process.exit(1);
  }
  