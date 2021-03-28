const { findAuthorsByBookIdsLoader }= require('./author');
const { findBooksByIdsLoader } = require('./book');
const { findUsersByIdsLoader } = require('./user');


module.exports = () => {
    return {
        findAuthorsByBookIdsLoader: findAuthorsByBookIdsLoader(),
        findBooksByIdsLoader: findBooksByIdsLoader(),
        findUsersByIdsLoader: findUsersByIdsLoader(),
    }
};