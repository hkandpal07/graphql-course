const gravatar = require('gravatar');
const { allBooks, imageUrl }  = require('./book');
const { allReviews, createReview } = require('./review');

const resolvers = {
    User: {
        imageUrl: (user, args) => {
            return gravatar.url(user.email, { s: args.size })
        }
    },
    Book: {
        imageUrl: (book, { size }) => {
            return imageUrl(size, book.googleId);
        },
        authors: (book, args, context) => {       // all resolvers get these 3 parameters; parent query type, args, and context
            const { loaders } = context;
            const { findAuthorsByBookIdsLoader } = loaders;
            return findAuthorsByBookIdsLoader.load(book.id);
        },
        reviews: (book, args, context) => {
            const { loaders } = context;
            const { findReviewsByBookIdsLoader } = loaders;
            return findReviewsByBookIdsLoader.load(book.id);
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
        books: (root, args) => {
            return allBooks(args);
        },
        reviews: (root, args) => {
            return allReviews(args);
        },
        book: (root, args, context) => {
            const { loaders } = context;
            const { findBooksByIdsLoader } = loaders;
            return findBooksByIdsLoader.load(args.id); 
        }
    },
    Mutation: {
        createReview: (root, args) => {
            const { reviewInput } = args;
            return createReview(reviewInput);
        }
    }
}

module.exports = resolvers;