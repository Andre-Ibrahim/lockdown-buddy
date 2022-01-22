const username = window.prompt("Enter your username: ");

const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');

const socket = new WebSocket(`ws://localhost:8081?username=${username}`);

chatInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        const p = document.createElement('p');
        p.className = 'user-message';
        p.innerHTML = `${username}: ${chatInput.value}`;
        chatBody.appendChild(p);

        socket.send(chatInput.value);

        chatInput.value = "";
    }
}

socket.onmessage = (event) => {
    const [name, message] = event.data.split(":");
    if (name === 'user') {
        const p = document.createElement('p');
        p.className = 'user-message';
        p.innerHTML = `${username}: ${message}`;
        chatBody.appendChild(p);
    } else {
        const p = document.createElement('p');
        p.className = 'ai-message';
        p.innerHTML = `Lockdown Buddy: ${message}`;
        chatBody.appendChild(p);
    }
}
