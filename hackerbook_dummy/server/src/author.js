const { groupBy, map } = require('ramda');
const DataLoader = require('dataloader');
const query = require('./db');

const findAuthorsByBookIds = async(ids) => {
    const sql = `
        select a.*, ba.book_id
        from hb.author a
        join hb.book_author ba on a.id = ba.author_id
        where ba.book_id = ANY($1);
    `;

    const params = [ids];

    try {
        const result = await query(sql, params);
        const rowsById = groupBy(author => author.bookId, result.rows);
        return map((id) => {
            return rowsById[id]
        }, ids)
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const findAuthorsByBookIdsLoader = () => {
    return new DataLoader(findAuthorsByBookIds);
}

module.exports = {
    findAuthorsByBookIdsLoader
};