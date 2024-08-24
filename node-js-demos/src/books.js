var {LinkedList} =require('./list');
//require('./list-extension')



books=new LinkedList(
    {id:1,title:'The Accursed God', author: 'Vivek Dutta Mishra', price:299, rating:4.6,tags:'mahabharata,fiction,best-seller'},
    {id:2,title:'Rashmirathi', author: 'Ramdhari Singh Dinkar', price:99, rating:4.4, tags:'mahabharata, hindi, classic, poetry'},
    {id:3,title:'Urvashi', author: 'Ramdhari Singh Dinkar', price:99, rating:4.5, tags:'romance, hindi, classic, poetry'},
    {id:4,title:'The Alchemist', author: 'Paulo Coelho', price:199, rating:4.8, tags:'self-help, best-seller'},
    {id:5,title: 'Manas', author: 'Vivek Dutta Mishra', price:199, rating:4.7, tags:'mahabharata, poetry, hindi'},
    {id:6,title: 'Ajaya', author:'Anant Neelkantha', price:450, rating: 3.8,tags:'mahabharata,fiction'},
    {id:7,title:'Jay', author:'Dev Dutt Pattanayak', price:500, rating:4.1,tags:'mahabharata,fiction'},
    {id:8,title:'Kurukshetra', author:'Ramdhari Singh Dinkar', price:119, rating:4.6, tags:'mahabharata, poetry, hindi'},
    {id:9,title:'Ashwatthama', author:'Deepak Kumar', price:450, rating:4.6, tags:'mahabharata, fiction'}
);

function getBooks() {    
    return toList(books);    
}


function toList(ll){
    var BooksList = [];
    
    for (var n = ll._first; n; n = n.next) {
        var bookObj = n.value;
        var str = `Id: ${bookObj.id} Title: ${bookObj.title} | Author: ${bookObj.author} | Price: ${bookObj.price} | Rating: ${bookObj.rating} | Tags: ${bookObj.tags}`;
        BooksList.push(str);
    }

    return BooksList;
}

function getBooksByRatingRange(min, max) {
    
    var filteredBooks = books.filter(b => b.price >= min && b.price <= max);
    return toList(filteredBooks);
}


function getBooksByAuthor(author) {
    var filteredBooks= books.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
    return toList(filteredBooks)
}
function getBooksByTitle(title) {
    var filteredBooks= books.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
    return toList(filteredBooks)
}
function getBooksById(id) {
    var filteredBooks= books.filter(b => b.id===id);
    return toList(filteredBooks)
}


module.exports={
    books,getBooks,getBooksByRatingRange,toList,getBooksByAuthor,getBooksById,getBooksByTitle
};