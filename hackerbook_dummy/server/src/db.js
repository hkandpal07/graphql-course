const { Pool } = require('pg');
const humps = require('humps');

const pool = new Pool({
    host: 'localhost',
    database: 'hackerbook',
});

const query = async(sql, params) => {
    const client = await pool.connect();
    
    try {
        const result = await client.query(sql, params);
        const rows = humps.camelizeKeys(result.rows);
        return { ...result, rows }
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

module.exports = query;