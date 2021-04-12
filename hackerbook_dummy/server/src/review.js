const DataLoader = require('dataloader');
const { groupBy, map } = require('ramda');
const query = require('./db');

const ORDER_BY = {
    ID_ASC: 'id asc',
    ID_DESC: 'id desc'
};

const findReviewsByBookIds = async(ids) => {
    const sql = `
        select r.*
        from hb.review r 
        where r.book_id = ANY($1)
        order by r.id;
    `
    const params = [ids];

    try {
        const result = await query(sql, params);
        const rowsById = groupBy(review => review.bookId, result.rows);
        return map((id) => {
            const review =  rowsById[id];
            return review;
        }, ids);
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const allReviews = async(args) => {
    const orderBy = ORDER_BY[args.orderBy];

    const sql = `
        select * from hb.review order by ${orderBy};
    `;

    try {
        const result = await query(sql);
        return result.rows;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const findReviewsByBookIdsLoader = () => {
    return new DataLoader(findReviewsByBookIds);
}

const createReview = async(reviewInput) => {
    const { bookId, email, name, rating, title, comment } = reviewInput;
    const sql = `
        select * from hb.create_review($1, $2, $3, $4, $5, $6)
    `;
    const params = [bookId, email, name, rating, title, comment];

    try {
        const result = await query(sql, params);
        return result.rows[0];
    } catch(err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    allReviews,
    findReviewsByBookIdsLoader,
    createReview
};