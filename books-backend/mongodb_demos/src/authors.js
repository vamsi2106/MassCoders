var { connect, disconnect } = require("./connection");

var url =
  "mongodb+srv://vamsi:1Ur0EwtYAxmamKew@g7cr-books-app.yj0vx.mongodb.net/";

async function getAllAuthors() {
  var connection = await connect(url);

  var db = connection.db("books-database");

  var authors = db.collection("author");

  var authors = await authors.find({}, { biography: 0, _id: 0 }).toArray();

  return authors;
}

async function getAuthorById(id) {
  var connection = await connect(url);
  var db = connection.db("books-database");
  var authors = db.collection("author");
  var author = await authors.findOne({ id });
  return author;
}

async function createAuthor(...author) {
  var authorObj = {
    name: author[1],
    id: author[0],
    photo: author[2],
    biography: author[3],
    tags: author[4].split(","),
  };
  var connection = await connect(url);
  var db = connection.db("books-database");
  var authors = db.collection("author");
  var result = await authors.insertOne(authorObj);
  await disconnect(connection);
  return result;
}

async function updateAuthor(id, ...updatedInfo) {
  let obj = updatedInfo[0].split("="); //['name', 'vivek']
  let key = obj[0]; // 'name'
  let value = obj[1]; // 'vivek'
  let updateObj = {}; // {name : vivek}
  updateObj[key] = value;

  var connection = await connect(url);
  var db = connection.db("books-database");
  var authors = db.collection("author");
  var result = await authors.updateOne({ id }, { $set: updateObj });
  await disconnect(connection);
  return result;
}

async function deleteAuthor(id) {
  var connection = await connect(url);
  var db = connection.db("books-database");
  var authors = db.collection("author");
  var result = await authors.deleteOne({ id });
  await disconnect(connection);
  return result;
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
