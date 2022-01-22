const username = window.prompt("Enter your username: ");

const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');

const socket = new WebSocket("ws://localhost:8080");

chatInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        chatBody.value += `${username}: ${chatInput.value}\n`
        socket.send(chatInput.value);
        chatInput.value = "";
    }
}

socket.onmessage = (event) => {
    chatBody.value += `Lockdown Buddy: ${event.data}\n`
}
