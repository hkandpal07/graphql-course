const query = require('./db');

const allReviews = async() => {
    const sql = `
        select * from hb.review;
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