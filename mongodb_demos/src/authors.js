var {connect} =require('./connection');

var url='mongodb://localhost/';

async function connectionDb(){
    var connection= await connect(url);

    var db= connection.db('g7cr_202408');

    var authors= db.collection('authors');

    return authors;

}

async function getAllAuthors(){

    var authors= await authors.find({},{biography:0,_id:0}).toArray();

    return authors;

}

async function getAuthorById(id){

    var authors= await connectionDb();
    var author=await authors.findOne({id,});
    return author;

}

async function removeAuthorById(id){

    var authors= await connectionDb();
    var resultOfAfterRemove= await authors.deleteOne({id});
    return resultOfAfterRemove;

}

async function removeAuthorById(id){

    var authors= await connectionDb();
    var resultOfAfterRemove= await authors.deleteOne({id});
    return resultOfAfterRemove;

}

async function removeManyAuthorBy(id){

    var authors= await connectionDb();
    var resultOfAfterRemoveMany= await authors.deleteMany({id});
    return resultOfAfterRemoveMany;

}

async function insertAuthor(name,id,photo,biography,tags){

    var authors= await connectionDb();
    var insertNewAuthor = await authors.insertOne({name,id,photo,biography,tags});
    return insertNewAuthor;

}

async function updateAuthor(id,tags){

    var authors= await connectionDb();
    var updateAuthorData = await authors.updateOne({id},{$set:{tags}});
    return updateAuthorData;

}


module.exports={
    getAllAuthors,
    getAuthorById,
    removeAuthorById,
    removeManyAuthorBy,
    insertAuthor,
    updateAuthor
}