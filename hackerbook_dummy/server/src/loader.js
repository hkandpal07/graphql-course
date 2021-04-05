const { findAuthorsByBookIdsLoader }= require('./author');
const { findBooksByIdsLoader } = require('./book');
const { findUsersByIdsLoader } = require('./user');
const { findReviewsByBookIdsLoader } = require('./review');


module.exports = () => {
    return {
        findAuthorsByBookIdsLoader: findAuthorsByBookIdsLoader(),
        findBooksByIdsLoader: findBooksByIdsLoader(),
        findUsersByIdsLoader: findUsersByIdsLoader(),
        findReviewsByBookIdsLoader: findReviewsByBookIdsLoader(),
    }
};