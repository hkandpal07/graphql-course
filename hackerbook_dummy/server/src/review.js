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

module.exports = {
    allReviews,
    findReviewsByBookIdsLoader
};