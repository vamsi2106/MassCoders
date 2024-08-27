var {connect} =require('./connection');

var url='mongodb://localhost/';



async function getAllAuthors(){
    var connection= await connect(url);

    var db= connection.db('g7cr_202408');

    var authors= db.collection('authors');


    var authors= await authors.find({},{biography:0,_id:0}).toArray();

    return authors;

}

async function getAuthorById(id){

    var connection= await connect(url);
    var db= connection.db('g7cr_202408');
    var authors= db.collection('authors');
    var author=await authors.findOne({id,});
    return author;

}

async function removeAuthorById(id){

    var connection= await connect(url);
    var db= connection.db('g7cr_202408');
    var authors= db.collection('authors');
    var resultOfAfterRemove= await authors.deleteOne({id});
    return resultOfAfterRemove;

}

async function removeAuthorById(id){

    var connection= await connect(url);
    var db= connection.db('g7cr_202408');
    var authors= db.collection('authors');
    var resultOfAfterRemove= await authors.deleteOne({id});
    return resultOfAfterRemove;

}

async function removeManyAuthorBy(id){

    var connection= await connect(url);
    var db= connection.db('g7cr_202408');
    var authors= db.collection('authors');
    var resultOfAfterRemoveMany= await authors.deleteMany({id});
    return resultOfAfterRemoveMany;

}

async function insertAuthor(name,id,photo,biography,tags){

    var connection= await connect(url);
    var db= connection.db('g7cr_202408');
    var authors= db.collection('authors');
    var insertNewAuthor = await authors.insertOne({name,id,photo,biography,tags});
    return insertNewAuthor;

}

async function updateAuthor(id,tags){

    var connection= await connect(url);
    var db= connection.db('g7cr_202408');
    var authors= db.collection('authors');
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