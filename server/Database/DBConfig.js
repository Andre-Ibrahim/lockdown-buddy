const { Pool } = require('pg');


const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'bank',
  password: '',
  port: 26257,
});

exports.modules = pool;