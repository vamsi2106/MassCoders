use("books-database");

let books = db.getCollection("books");
let author = db.getCollection("author");

function uniqueAuthors() {
  return books.aggregate([
    {
      $project: {
        author: 1,
        id: 1,
        price: 1,
        rating: 1,
        reviews: { $size: "$reviews" },
      },
    },
    {
      $group: {
        _id: "$author",
        booksWritten: { $sum: 1 },
        avgPrice: { $avg: "$price" },
        avgRating: { $avg: "$rating" },
        numberOfvotes: { $sum: "$reviews" },
      },
    },
  ]);
}

uniqueAuthors();

function getinfoBookAuthor() {
  return books.aggregate([
    {
      $lookup: {
        from: "author",
        localField: "authorId",
        foreignField: "id",
        as: "authorDetails",
      },
    },
    {
      $unwind: "$authorDetails",
    },
    {
      $group: {
        _id: "$authorId",
        authorName: { $first: "$authorDetails.name" },
        authorPhoto: { $first: "$authorDetails.photo" },
        booksWritten: { $push: "$title" },
        totalReviews: { $sum: { $size: "$reviews" } },
        averagePrice: { $avg: "$price" },
        totalRating: { $avg: "$rating" },
      },
    },
  ]);
}
getinfoBookAuthor();

function bookCategories() {
  return books.aggregate([
    {
      $project: {
        _id: 0,
        title: 1,
        author: 1,
        tags: 1,
        rating: 1,
        reviews: { $size: "$reviews" },
      },
    },
    {
      $unwind: "$tags",
    },

    {
      $group: {
        _id: "$tags",
        bookCount: { $sum: 1 },
        reviewsCount: { $sum: "$reviews" },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
}

bookCategories();
