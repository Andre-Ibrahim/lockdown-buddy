const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'lockdown_buddy',
  password: '',
  port: 26257,
});

module.exports = {
  pool
};
