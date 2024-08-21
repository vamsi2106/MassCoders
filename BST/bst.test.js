var { expect, should } = require("chai");
var { Bst } = require("../src/bst");
should();

describe("BST specs", function () {
  var bst;
  beforeEach(() => {
    bst = new Bst();
  });

  describe("Initial Setup", () => {
    it("should be a Bst object", () => {
      var bst = new Bst();
      expect(bst).to.be.instanceOf(Bst);
    });

    it("isEmpty() should be true", () => {
      bst.isEmpty().should.be.true;
    });

    it("size() should be 0", () => {
      //expect.fail('Not Yet Implemented');
      bst.size.should.equal(0);
    });
  });

  describe("Add", () => {
    it("should add an item to a bst", () => {
      bst.add(12);
    });

    it("should increase the bst size", () => {
      bst.add(12);
      bst.size.should.equal(1);
    });

    it("should make bst not empty", () => {
      bst.add(12);
      bst.isEmpty().should.be.false;
    });

    it("should remove duplicates", () => {
      bst.add(1, 4, 6, 7, 6);
      bst.size.should.equal(4);
    });
  });

  describe("contains", () => {
    it("should result true when bst contains the value", () => {
      bst.add(1, 4, 6, 7, 6);
      bst.contains(bst.root, 7).should.true;
    });

    it("should result false when bst doesnt contain the value", () => {
      bst.add(1, 4, 6, 7, 6);
      bst.contains(bst.root, 10).should.false;
    });
  });

  describe("Traversal", () => {
    function captureConsoleOutput(func) {
      let output = "";
      const originalConsoleLog = console.log;
      console.log = (msg) => {
        output += msg + " ";
      };
      func();
      console.log = originalConsoleLog;
      return output.trim();
    }

    it("should perform inorder traversal correctly", () => {
      bst.add(10, 5, 15, 3, 7);
      const output = captureConsoleOutput(() => bst.inorderTraversal(bst.root));
      output.should.equal("3 5 7 10 15");
    });

    it("should perform preorder traversal correctly", () => {
      bst.add(10, 5, 15, 3, 7);
      const output = captureConsoleOutput(() =>
        bst.preorderTraversal(bst.root)
      );
      output.should.equal("10 5 3 7 15");
    });

    it("should perform postorder traversal correctly", () => {
      bst.add(10, 5, 15, 3, 7);
      const output = captureConsoleOutput(() =>
        bst.postorderTraversal(bst.root)
      );
      output.should.equal("3 7 5 15 10");
    });
  });
});
