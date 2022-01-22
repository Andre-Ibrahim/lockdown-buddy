const { pg } = require("pg");
const pool = require("./DBConfig");
const userSeedData = require("./seedData/userSeedData");

(async () => {
    console.log(pool.modules)

    const client = await pool.modules.connect();

    await client.query("Begin");

    for(user of userSeedData.modules){

        const sql = `INSERT INTO users (user_id, username, message, response) values 
        (${user.user_id}, '${user.username}', '${user.message}', '${user.response}')`;
        
        await client.query(sql);
    }

    await client.query("COMMIT");

    client.release();

})().catch(e => console.log(e));