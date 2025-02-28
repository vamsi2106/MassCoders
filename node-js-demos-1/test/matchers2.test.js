// let { LinkedList } = require("../src/list");
// require("../src/list-extension");

// require("mocha");
// let { should, expect } = require("chai");
// should();
// let { books } = require("../src/books");

// let { matchers, generators, fill } = require("../src/matchers");
// let { fixed, range } = generators;
// let { match, contains, not, between, any, all, containsNoneOf, or } = matchers;

// describe("fill function", () => {
//   it("should fill an array with 5 times 1", () => {
//     var array = [];
//     fill(array, fixed(5, 1));
//     expect(array).to.deep.equal([1, 1, 1, 1, 1]);
//   });

//   it("should fill array with range", () => {
//     var array = [];
//     fill(array, range(1, 5));
//     array.should.deep.equal([1, 2, 3, 4]);
//   });

//   it("should fill Linked List with range(2,20,5)", () => {
//     var list = new LinkedList();
//     fill((v) => list.append(v), range(2, 20, 5));
//     var expected = [2, 7, 12, 17];
//     for (let i = 0; i < expected.length; i++) {
//       list.get(i).should.equal(expected[i]);
//     }
//   });
// });

// describe("match matcher", () => {
//   it("should return books by author", () => {
//     let result = books.filter(match({ author: "Vivek Dutta Mishra" }));

//     result.size().should.equal(2);
//   });

//   it("should be able to find book by partial author name using contains", () => {
//     let result = books.filter(match({ author: contains("vivek") }));
//     result.size().should.equal(2);
//   });

//   it("should be able to find books by authors other than vivek", () => {
//     var result = books.filter(match({ author: not(contains("vivek")) }));
//     result.size().should.equal(books.size() - 2);
//   });

//   it("should be able to find books in price range 200-300", () => {
//     var result = books.filter(
//       match({
//         price: between(200, 300),
//       })
//     );
//     result.size().should.equal(1);
//   });

//   it("should find books by vivek under 200", () => {
//     var result = books.filter(
//       match({
//         price: matchers.lessThan(200),
//         author: contains("vivek"),
//       })
//     );

//     result.size().should.equal(1);
//     result.get(0).title.should.equal("Manas");
//   });

//   it("should return book on mahabharata with rating>4.5 or price<200", () => {
//     var result = books.filter(
//       match({
//         tags: contains("mahabharata"),
//         $priceOrRating: any(
//           match({ rating: matchers.greaterThan(4.8) }),
//           match({ price: matchers.lessThan(200) })
//         ),
//       })
//     );

//     result.size().should.be.equal(3);
//   });

//   it("should return all poetry books by vivek or dinkar", () => {
//     var result = books.filter(
//       match({
//         author: any(contains("vivek"), contains("dinkar")),
//         tags: contains("poetry"),
//       })
//     );

//     result.size().should.be.equal(4);
//   });

//   it("it should return poetry books by author other than dinkar", () => {
//     var result = books.filter(
//       match({
//         author: not(contains("dinkar")),
//         tags: contains("poetry"),
//       })
//     );

//     result.size().should.equals(1);
//   });

//   it("should return all books written by authors other than dinkar and vivek", () => {
//     var result = books.filter(
//       match({
//         //author: containsNoneOf('vivek','dinkar')
//         author: not(any(contains("vivek"), contains("dinkar"))),
//       })
//     );

//     result.size().should.equal(books.size() - 5);
//   });

//   it("should filter all poetry books that are not on mahabharata", () => {
//     var result = books.filter(
//       match({
//         tags: matchers.all(not(contains("mahabharata")), contains("poetry")),
//         // rating: matchers.greaterThan(4.5)
//       })
//     );

//     result.size().should.equal(1);
//   });

//   it("should filter poetry books with either rating>4.5 or price<200", () => {
//     var result = books.filter(
//       match({
//         tags: contains("poetry"),
//         $1: any(
//           match({ rating: matchers.greaterThan(4.6) }),
//           match({ price: matchers.lessThan(100) })
//         ),
//       })
//     );

//     result.size().should.equal(3);
//   });
// });
