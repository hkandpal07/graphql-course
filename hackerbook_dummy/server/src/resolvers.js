const { allBooks, imageUrl }  = require('./book');

const resolvers = {
    Book: {
       imageUrl: (book, { size }) => {
            return imageUrl(size, book.googleId);
       }
    },
    Query: {
        books: () => {
            return allBooks();
        },
    }
}

module.exports = resolvers;