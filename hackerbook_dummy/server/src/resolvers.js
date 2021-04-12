const gravatar = require('gravatar');
const { allBooks, imageUrl, searchBook, createBook }  = require('./book');
const { allReviews, createReview } = require('./review');
const { search } = require('./search');

const resolvers = {
    User: {
        imageUrl: (user, args) => {
            return gravatar.url(user.email, { s: args.size })
        }
    },
    SearchBookResult: {
        imageUrl: (result, args) => imageUrl(args.size, result.id)
    },
    SearchResult: {
        __resolveType: obj => obj.__type,
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
        },
        searchBook: (root, args) => {
            const { query } = args;
            return searchBook(query);
        },
        search: (root, args) => {
            const { query } = args;
            return search(query);
        }
    },
    Mutation: {
        createReview: (root, args) => {
            const { reviewInput } = args;
            return createReview(reviewInput);
        },
        createBook: (root, args) => {
            const { googleBookId } = args;
            return createBook(googleBookId);
        }
    }
}

module.exports = resolvers;