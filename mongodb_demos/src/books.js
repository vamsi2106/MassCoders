var {connect} =require('./connection');

var url='mongodb://localhost/';

async function connectionDb(){
    var connection= await connect(url);

    var db= connection.db('g7cr_202408');

    var books= db.collection('books');

    return books;

}

async function getAllBooks(){
   
    var books= await connectionDb();
    var bookss= await books.find();
    return bookss;
}

async function getBookById(id){

    var books= await connectionDb();
    var book =await books.findOne({id});
    return book;

}

async function removeBookById(id){

    var books= await connectionDb();
    var resultOfAfterRemove= await books.deleteOne({id});
    return resultOfAfterRemove;

}

async function removeBookById(id){

    var books= await connectionDb();
    var resultOfAfterRemove= await books.deleteOne({id});
    return resultOfAfterRemove;

}

async function removeManyBookBy(id){

    var books= await connectionDb();
    var resultOfAfterRemoveMany= await books.deleteMany({id});
    return resultOfAfterRemoveMany;

}

async function insertBook(id,title,isbn,author,pricephoto,tags,cover,reviews,rating,authorId){

    var books= await connectionDb();
    var insertNewBook = await books.insertOne({id,title,isbn,author,pricephoto,tags,cover,reviews,rating,authorId});
    return insertNewBook;

}

async function updateBook(id,tags,price){

    var books= await connectionDb();
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