const broadcastSocket = new WebSocket("ws://localhost:5000");

broadcastSocket.onmessage = (message) => {
    console.log(message);
};
