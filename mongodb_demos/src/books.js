
var {connect} =require('./connection');

var url='mongodb://localhost/';

async function getAllBooks(){
    var connection= await connect(url);

    var db= connection.db('g7cr_202408');

    var books= db.collection('books');
    var bookss= await books.find();
    return bookss;
}

async function getBookById(id){

    var connection= await connect(url);
    var db= connection.db('g7cr_202408');
    var books= db.collection('books');
    var book =await books.findOne({id});
    return book;

}

async function removeBookById(id){

    var connection= await connect(url);
    var db= connection.db('g7cr_202408');
    var books= db.collection('books');
    var resultOfAfterRemove= await books.deleteOne({id});
    return resultOfAfterRemove;

}

async function removeBookById(id){

    var connection= await connect(url);
    var db= connection.db('g7cr_202408');
    var books= db.collection('books');
    var resultOfAfterRemove= await books.deleteOne({id});
    return resultOfAfterRemove;

}

async function removeManyBookBy(id){

    var connection= await connect(url);
    var db= connection.db('g7cr_202408');
    var books= db.collection('books');
    var resultOfAfterRemoveMany= await books.deleteMany({id});
    return resultOfAfterRemoveMany;

}

async function insertBook(id,title,isbn,author,pricephoto,tags,cover,reviews,rating,authorId){

    var connection= await connect(url);
    var db= connection.db('g7cr_202408');
    var books= db.collection('books');
    var insertNewBook = await books.insertOne({id,title,isbn,author,pricephoto,tags,cover,reviews,rating,authorId});
    return insertNewBook;

}

async function updateBook(id,tags,price){

    var connection= await connect(url);
    var db= connection.db('g7cr_202408');
    var books= db.collection('books');
    var updateBookData = await books.updateOne({id},{$set:{tags:tags,price:price}});
    return updateBookData;

}


module.exports={
    getAllBooks,
    getBookById,
    removeBookById,
    removeManyBookBy,
    insertBook,
    updateBook
}