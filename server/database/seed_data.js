const { pg } = require("pg");
const pool = require("./db_config");
const dbConfig = require('./db_config');
const userData = require('./seedData/userSeedData');

(async () => {
    const client = await dbConfig.pool.connect();

    await client.query("Begin");

    for (const user of userData.userSeedData) {

        const sql = `INSERT INTO users (user_id, username, message, response) values 
        (${user.user_id}, '${user.username}', '${user.message}', '${user.response}')`;

        await client.query(sql);
    }

    await client.query("COMMIT");

    client.release();

})();
