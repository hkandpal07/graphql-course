import { map } from 'ramda';
const query = require("./db");

const search = async(term) => {
    const books = await searchBooks(term);
    const users = await searchUsers(term);
    const authors = await searchAuthors(term);
    const reviews = await searchReviews(term);
    return [...books, ...users, ...authors, ...reviews];
}

const searchBooks = async(term) => {
    const sql = `
        select * from hb.book
        where tokens @@ to_tsquery($1);
    `;

    try {
        const params = [term];
        const result = await query(sql, params);
        return map(obj => ({ ...obj, __type: 'Book' }), result.rows);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const searchUsers = async(term) => {
    const sql = `
        select * from hb.user
        where tokens @@ to_tsquery($1);
    `;

    try {
        const params = [term];
        const result = await query(sql, params);
        return map(obj => ({ ...obj, __type: 'User' }), result.rows);
    } catch (err) {
        console.log(err);
        throw err;
    }
}


const searchAuthors = async(term) => {
    const sql = `
        select * from hb.author
        where tokens @@ to_tsquery($1);
    `;

    try {
        const params = [term];
        const result = await query(sql, params);
        return map(obj => ({ ...obj, __type: 'Author' }), result.rows);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const searchReviews = async(term) => {
    const sql = `
        select * from hb.review
        where tokens @@ to_tsquery($1);
    `;

    try {
        const params = [term];
        const result = await query(sql, params);
        return map(obj => ({ ...obj, __type: 'Review' }), result.rows);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    search
};