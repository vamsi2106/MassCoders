var EventEmitter = require("events");
var { isPrimeSync } = require("./primes");

var instanceCount = 0;
function findPrimes(min, max) {
  var event = new EventEmitter();
  var low = min;
  var high = Math.min(max, min + 1000);
  var index = 0;
  var id = ++instanceCount;
  var batch = 0;
  var isPaused = false; // Flag to control pause and resume
  var iid; // Store interval ID for control

  function processPrimes() {
    if (max <= min) {
      event.emit("ERROR", { id, min, max, error: `Invalid Range` });
      clearInterval(iid);
      return;
    }

    for (var i = low; i < high; i++) {
      if (isPrimeSync(i)) {
        index++;
        event.emit("PRIME", { id, min, max, index, prime: i });
      }
    }
    batch++;
    event.emit("PROGRESS", { id, min, max, batch, high, primes: index });

    low = high;
    high = Math.min(max, low + 1000);
    if (high <= low) {
      event.emit("DONE", { id, min, max, primes: index });
      clearInterval(iid);
    }
  }

  iid = setInterval(function () {
    if (!isPaused) {
      processPrimes();
    }
  }, 1);

  event.on("ABORT", function () {
    clearInterval(iid);
    event.emit("ABORTED", { id, min, max, primes: index, high });
  });

  event.on("PAUSE", function () {
    isPaused = true;
    event.emit("PAUSED", { id, min, max, primes: index, high });
  });

  event.on("RESUME", function () {
    if (isPaused) {
      isPaused = false;
      processPrimes();
      event.emit("RESUMED", { id, min, max, primes: index, high });
    }
  });

  return event;
}

module.exports = {
  findPrimes,
};
