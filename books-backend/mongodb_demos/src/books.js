
var {connect} =require('./connection');

var url='mongodb://localhost/';

async function connectAndGetCollection(){
    var connection= await connect(url);
    var db= connection.db('g7cr-training');
    var authors= db.collection('books');
    return authors
}

async function getAllBooks(){
    var books=await connectAndGetCollection();
    let result=await books.find().toArray()
    return result
}

async function getBookById(id){
    var books= await connectAndGetCollection();
    var book =await books.findOne({id});
    return book;
}

async function removeBookById(id){
    let result;
    var books= await connectAndGetCollection();
    var resultObj= await books.deleteOne({id});
    if(!id){
        return "Enter Id to remove a Book..."
    }
    if(resultObj){
        let {acknowledged,deletedCount}=resultObj;
        if(acknowledged===true && deletedCount>0 ){ 
            result= `Removed Book with Id: ${id}`
        }else{
            result=`No Book with the given Id: ${id}`
        }
    }
    return result;

}

async function removeAllBooks(id){

    let result;
    let books=await connectAndGetCollection()
    let resultObj=await books.deleteMany({})
    if(resultObj){
        let {acknowledged,deletedCount}=resultObj;
        if(acknowledged===true && deletedCount>0 ){ 
            result= `Removed all Books`
        }else{
            result=`Error: Could not remove all books`
        }
    }
    return result;

}

async function insertBook(...args){
    let bookData={};
    for (let i=0; i<args.length; i++){
        if(i%2===0){
            let field=args[i]
            bookData[field]=args[i+1];
        }
        i++
    }
    var books= await connectAndGetCollection();
    var insertNewBook = await books.insertOne(bookData);
    return insertNewBook;

}

// async function updateBook(...args){
//     let id=args[0]
//     var books= await connectAndGetCollection();
//     var updateBookData = await books.updateOne({id},{$set:{tags:tags,price:price}});
//     return updateBookData;

// }


module.exports={
    getAllBooks,
    getBookById,
    removeBookById,
    removeAllBooks,
    insertBook,
    
}