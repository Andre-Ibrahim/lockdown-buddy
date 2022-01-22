const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require("http");
const websocket = require("ws");
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('port', 5000);

app.get('/', async (req, res) => {
    res.render("home-page");
});

const server = http.createServer(app);

const wss = new websocket.WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
    console.log("connected to websocket")

    ws.on('message', (message) => {
        console.log(message);
    });
});

server.listen(5000, () => {
    console.log(`Server started on port ${server.address().port}`);
});
