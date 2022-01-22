const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'bank',
  password: '',
  port: 26257,
});

pool.query('SELECT * From accounts', (err, res) => {
    console.log(err, res)
    pool.end()
  })