
const username = window.prompt("Enter your username: ");

const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');

const socket = new WebSocket(`ws://localhost:8081?username=${username}`);

chatInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        const p = document.createElement('p');
        p.className = 'user-message';
        p.innerHTML = `${chatInput.value}`;

        const div = document.createElement('div');
        div.className = 'user-message-div center-text';
        div.appendChild(p);

        chatBody.appendChild(div);

        socket.send(chatInput.value);

        chatInput.value = "";
    }
}

socket.onmessage = (event) => {
    const [name, message] = event.data.split(":");
    if (name === 'user') {
        const p = document.createElement('p');
        p.className = 'user-message';
        p.innerHTML = `${message}`;

        const div = document.createElement('div');
        div.className = 'user-message-div center-text';
        div.appendChild(p);

        chatBody.appendChild(div);
    } else {
        const p = document.createElement('p');
        p.className = 'ai-message';
        p.innerHTML = `${message}`;

        const div = document.createElement('div');
        div.className = 'center-text2';
        div.appendChild(p);

        chatBody.appendChild(div);
    }
}
