const query = require('./db');

const ORDER_BY = {
    ID_ASC: 'id asc',
    ID_DESC: 'id desc'
};

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

module.exports = {
    allReviews
};