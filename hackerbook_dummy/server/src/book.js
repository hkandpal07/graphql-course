const DataLoader = require('dataloader');
const { groupBy, map } = require('ramda');
const query = require('./db');

const allBooks = async () => {
    const sql = `
        select * from hb.book
    `;

    try {
        const result = await query(sql);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const findBooksByIds = async(ids) => {
    const sql = `
        select b.*
        from hb.book b 
        where b.id = ANY($1);
    `
    const params = [ids];

    try {
        const result = await query(sql, params);
        const rowsById = groupBy(book => book.id, result.rows);
        return map((id) => {
            const book =  rowsById[id] ? rowsById[id][0] : null;
            return book;
        }, ids);
    } catch(err) {
        console.log(err);
        throw err;
    }
    
}

const findBooksByIdsLoader = () => {
    return new DataLoader(findBooksByIds);
}

const imageUrl = (size, id) => {
    const zoom = size === 'SMALL' ? 1 : 0;
    return `//books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=${zoom}&source=gbs_api`
}

module.exports = {
    allBooks,
    imageUrl,
    findBooksByIdsLoader
};