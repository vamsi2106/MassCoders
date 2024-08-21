var Calculator = require("../src/calc");
var app = require("../src/app1");

var { expect } = require("chai");

var x = 10;
var y = 5;

function infixFormatter(value1, operator, value2, result) {
  return `${value1} ${operator} ${value2} = ${result}`;
}
var formatters = {
  inline: infixFormatter,
  raw: (_, __, ___, result) => result,
  function: (v1, o, v2, r) => `${o}(${v1},${v2}) = ${r}`,
};

var presenters = {
  result: (result) => (resultTextBox.innerHTML = result),
  resultBox: (result) => (resultBox.value = result),
  alert: (result) => alert(result),
};

describe("operators", function () {
  var calc = new Calculator();

  

  describe("execution", () => {

    this.beforeEach(function () {
        calc = new Calculator();
      });

    it(`should correctly apply the plus operator`, () => {
      expect(calc.operators["plus"](x, y)).to.be.equal(x + y);
    });

    it(`should correctly apply the minus operator`, () => {
      expect(calc.operators["minus"](x, y)).to.be.equal(x - y);
    });

    it(`should correctly apply the multiply operator`, () => {
      expect(calc.operators["multiply"](x, y)).to.be.equal(x * y);
    });

    it(`should correctly apply the divide operator`, () => {
      expect(calc.operators["divide"](x, y)).to.be.equal(x / y);
    });
  });

  describe("addOperators function", function () {


    it("should have function and string as arguments", function() {
        var addOperatorFunction = (x, y) => x ** y;
        var addOperatorName = "power";
        calc.addOperator(addOperatorFunction, addOperatorName);
        expect(addOperatorFunction).to.be.a("function");
        expect(addOperatorName).to.be.a("string");
    });
    

    it("the nw operator with operator function working",function(){
        var addOperatorFunction = (x, y) => x ** y;
        var addOperatorName = "power";
        calc.addOperator(addOperatorFunction, addOperatorName);
    
        
        expect(calc.operators[addOperatorName]).to.be.a("function");
        expect(calc.operators[addOperatorName](2, 3)).to.be.equal(2 ** 3);
    
    })    

  });


});

describe("presenters", function () {
  var calc = new Calculator();
  app.initialize();

  it("should be changed by setPresenter", () => {
    const presenterFunction = presenters.result;
    calc.setPresenter(presenterFunction);
    expect(calc.presenter).to.equal(presenterFunction);
  });

  it("should contain function not a value", () => {
    expect(calc.presenter).to.be.a("function");
  });
});

describe("formaters", function () {
  var calc = new Calculator();
  app.initialize();

  it("should be changed by setFormater", () => {
    const formatterFunction = formatters.inline;
    calc.setFormatter(formatterFunction);
    expect(calc.formatter).to.equal(formatterFunction);
  });

  it("should contain function not a value", () => {
    expect(calc.formatter).to.be.a("function");
  });
});
