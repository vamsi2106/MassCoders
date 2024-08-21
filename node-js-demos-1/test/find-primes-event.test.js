var { should, expect } = require("chai");
var { donnable } = require("../src/test-utils");

should();

var { isPrimeSync } = require("../src/primes");
var { findPrimes } = require("../src/prime-events");

describe("findPrimes Events", function () {
  it("should return error on invalid range", function (done) {
    let event = findPrimes(10, 1);
    event.on("ERROR", (response) => {
      response.error.should.equal("Invalid Range");
      done();
    });
  });

  it('should return a prime with message="prime"', function (done) {
    let event = findPrimes(0, 100);

    event.on("PRIME", (response) => {
      expect(response.prime).to.not.be.undefined;
      expect(typeof response.prime).to.equal("number");
      isPrimeSync(response.prime).should.be.true;
    });

    event.on("DONE", () => done());
  });

  it('should called  message="prime" for every prime found', function (done) {
    findPrimes(0, 100).on("DONE", (response) => {
      response.primes.should.equal(25);
      done();
    });
  });

  it('should call message:"progress" in a batch of 1000', (done) => {
    var count = 0;
    findPrimes(0, 20000)
      .on("PROGRESS", () => count++)
      .on("DONE", (response) => {
        count.should.equal(Math.ceil(response.max / 1000));
        done();
      });
  });

  it('should abort the process and return message:"abort" on received abort request from the client', (done) => {
    let aborted = false;
    var event = findPrimes(2, 20000);

    event.on("PRIME", (response) => {
      if (response.index === 100) {
        //send abort message to the service
        event.emit("ABORT");
      }
    });

    event.on("ABORTED", () => {
      done();
    });

    event.on("DONE", () => {
      done(new Error("ABORT REQUEST FAILED"));
    });
  });

  it("should emit PAUSE event and stop processing", function (done) {
    let paused = false;
    let resumeEmitted = false;

    var event = findPrimes(0, 1000);

    event.on("PROGRESS", () => {
      if (!paused) {
        event.emit("PAUSE");
      }
    });

    event.on("PAUSED", () => {
      paused = true;
      // Delay to ensure PAUSE has stopped processing
      setTimeout(() => {
        resumeEmitted.should.be.false; // Ensure RESUME has not been emitted yet
        done(); // Finish the test after PAUSED event
      }, 100); // Short delay to simulate pause
    });

    event.on("RESUMED", () => {
      resumeEmitted = true; // Track if RESUME event is emitted
    });
  });

  it("should emit RESUME event and continue processing", function (done) {
    let paused = false;
    let resumed = false;

    var event = findPrimes(0, 1000);

    event.on("PROGRESS", () => {
      if (!paused) {
        event.emit("PAUSE");
      } else if (paused && !resumed) {
        setTimeout(() => {
          event.emit("RESUME");
        }, 50); // Short delay before emitting RESUME
      }
    });

    event.on("PAUSED", () => {
      paused = true;
    });

    event.on("RESUMED", () => {
      resumed = true;
    });

    event.on("DONE", (response) => {
      expect(paused).to.be.true;
      expect(resumed).to.be.true;
      expect(response.primes).to.be.a("number");
      done();
    });
  });
});
