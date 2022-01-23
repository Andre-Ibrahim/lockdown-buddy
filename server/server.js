const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require("http");
const websocket = require("ws");
const dotenv = require('dotenv');
const axios = require('axios');
const dbConfig = require('./database/db_config');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('port', 8081);

app.get('/', async (req, res) => {
    res.render("pages/index");
});
// chat page
app.get('/chat', async (req, res) => {
  res.render('pages/chat');
});

const server = http.createServer(app);

const wss = new websocket.WebSocket.Server({ server });

wss.on('connection', async (ws, req) => {
    const username = req.url.split("=")[1];

    const client = await dbConfig.pool.connect();
    const { rows } = await client.query(`SELECT * FROM users WHERE username='${username}'`);
    rows.forEach((row) => {
        ws.send(`user:${unescape(row.message)}`);
        ws.send(`ai:${unescape(row.response)}`);
    });

    ws.on('message', async (message) => {
        const { data } = await axios.get(`http://localhost:5000/predict?message=${message.toString()}`);
        ws.send(`ai:${data.toString()}`);
        const sql = `INSERT INTO users (username, message, response) values 
        ('${username}', '${escape(message)}', '${escape(data)}')`;
        await client.query(sql);
    });
});

server.listen(8081, () => {
    console.log(`Server started on port ${server.address().port}`);
});
