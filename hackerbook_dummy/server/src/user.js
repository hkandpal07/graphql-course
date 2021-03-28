const { groupBy, map } = require('ramda');
const DataLoader = require('dataloader');
const query = require('./db');

const findUsersByIds = async(ids) => {
    const sql = `
        select u.*
        from hb.user u
        where u.id = ANY($1);
    `
    const params = [ids];

    try {
        const result = await query(sql, params);
        const rowsById = groupBy(user => user.id, result.rows);
        return map((id) => {
            const user = rowsById[id] ? rowsById[id][0] : null;
            return user;
        }, ids)
    } catch(err) {
        console.log(err);
        throw err;
    }
};

const findUsersByIdsLoader = () => {
    return new DataLoader(findUsersByIds);
};

module.exports = {
    findUsersByIdsLoader
};