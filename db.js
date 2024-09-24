const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'expense_tracker',
    password: 'arfin27',
    port: 5432,
});

module.exports = pool;

