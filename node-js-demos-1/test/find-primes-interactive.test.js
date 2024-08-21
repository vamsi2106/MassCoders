var { should, expect } = require("chai");
var { donnable } = require("../src/test-utils");

should();

var { findPrimesInteractive, isPrimeSync } = require("../src/primes");

describe("findPrimesInteractive", function () {
  it("should raise error if no callback is provided", function () {
    expect(() => findPrimesInteractive()).to.throw("callback not specified");
  });

  it("should return a unqiue id for each findPrimesInteractive calls", function () {
    var id1 = findPrimesInteractive(2, 10, (response) => {});
    var id2 = findPrimesInteractive(10, 20, (response) => {});

    expect(id1).to.be.an("object");
    expect(id1.id).to.be.a("number");

    expect(id2).to.be.an("object");
    expect(id2.id).to.be.a("number");
  });

  it("should return error on invalid range", function (done) {
    findPrimesInteractive(10, 1, (msg) => {
      if (msg.message === "error") {
        expect(msg.error).to.equal("Invalid Range");
        done();
      }
    });
  });

  it('should return a prime with message="prime"', function (done) {
    let primeReceived = false;

    findPrimesInteractive(1, 10, (msg) => {
      if (msg.message === "prime") {
        expect(msg.prime).to.be.a("number");
        if (!primeReceived) {
          primeReceived = true;
          done();
        }
      }
    });
  });
  it('should called  message="prime" for every prime found', function (done) {
    let primesFound = 0;
    findPrimesInteractive(0, 100, (response) => {
      if (response.message === "prime") {
        primesFound++;
      }
      if (response.message === "done") {
        expect(primesFound).to.equal(response.primes.length);
        done();
      }
    });
  });

  it('should call message:"progress" in a batch of 1000', (done) => {
    var count = 0;
    findPrimesInteractive(0, 20000, (response) => {
      if (response.message === "progress") {
        count++;
        expect(response.done).to.equal(count * 1000);
      }

      if (response.message === "done") {
        expect(count).to.equal(Math.ceil(response.max / 1000));
        done();
      }
    });
  });

  it("sends one prime value at a time", (done) => {
    var primes = [];
    findPrimesInteractive(0, 100, (response) => {
      if (response.message === "prime") {
        primes.push(response.prime);
      }

      if (response.message === "done") {
        expect(primes.length).to.equal(25);
        done();
      }
    });
  });

  it("should abort the process and return message='ABORTED' on received abort request", function (done) {
    const task = findPrimesInteractive(1, 100, (msg) => {
      if (msg.message === "aborted") {
        expect(msg.message).to.equal("aborted");
        done();
      }
    });

    setTimeout(() => {
      task.conclude("abort");
    }, 10);
  });
});
