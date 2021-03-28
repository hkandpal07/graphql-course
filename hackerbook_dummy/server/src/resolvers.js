const { allBooks, imageUrl }  = require('./book');
const { allReviews } = require('./review');

const resolvers = {
    Book: {
       imageUrl: (book, { size }) => {
            return imageUrl(size, book.googleId);
       },
       authors: (book, args, context) => {
           const { loaders } = context;
           const { findAuthorsByBookIdsLoader } = loaders;

           return findAuthorsByBookIdsLoader.load(book.id);
       }
    },
    Review: {
        book: (review, args, context) => {
            const { loaders } = context;
            const { findBooksByIdsLoader } = loaders;

            return findBooksByIdsLoader.load(review.bookId);
        },
        user: (review, args, context) => {
            const { loaders } = context;
            const { findUsersByIdsLoader } = loaders;

            return findUsersByIdsLoader.load(review.userId);
        }
    },
    Query: {
        books: () => {
            return allBooks();
        },
        reviews: () => {
            return allReviews();
        }
    }
}

module.exports = resolvers;