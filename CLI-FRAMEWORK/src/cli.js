const prompt = require("prompt-sync")({ sigint: true });

class CLI {
  constructor() {
    this.commands = {
      help: {
        description: "List of available commands.",
        action: () => this.showHelp(),
      },
      exit: {
        description: "Exits the application.",
        action: () => this.exit(),
      },
      clear: {
        description: "Clears the console.",
        action: () => this.clearConsole(),
      },
    };
  }

  // to add a new command with the CLI
  addCommand(name, description, action) {
    this.commands[name] = { description, action };
  }

  // to display all available commands
  showHelp() {
    console.log("Available Commands:");
    for (let cmd in this.commands) {
      console.log(`${cmd}: ${this.commands[cmd].description}`);
    }
  }

  // to exit the application
  exit() {
    console.log("Exiting the application. 👋");
    process.exit(0);
  }

  // to execute a command  get-books
  runCommand(cmd, args) {
    if (this.commands[cmd]) {
      this.commands[cmd].action(args);
    } else {
      console.log(`Unknown command: ${cmd} ❓`);
      this.showHelp();
    }
  }

  // to clear console
  clearConsole() {
    console.clear();
  }

  // to parse command-line arguments
  parseArgs() {
    const args = process.argv.slice(2); //Split input into command and arguments

    //>
    if (args.length) {
      const [cmd, ...cmdArgs] = args;
      this.runCommand(cmd, cmdArgs);
    } else {
      // If no command was provided, start interactive mode
      this.startInteractiveMode();
    }
  }

  // to start interactive mode using prompt-sync
  startInteractiveMode() {
    console.log(
      "Interactive mode started. Type 'exit' or 'ctrl+c' to quit. 🕹️"
    );
    while (true) {
      const input = prompt("> "); // Read user input  
      // get-books "vivek"
      const [cmd, ...cmdArgs] = input.split(" ");
      this.runCommand(cmd, cmdArgs);
    }
  }

  error(message) {
    console.error(`${message}`);
  }

  print(message) {
    console.log(message);
  }
}

module.exports = CLI;
