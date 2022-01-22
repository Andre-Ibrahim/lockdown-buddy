const username = window.prompt("Enter your username: ");

const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');

const socket = new WebSocket(`ws://localhost:8080?username=${username}`);

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

socket.onopen = () => {
    console.log("test");
}

socket.onmessage = (event) => {
    const p = document.createElement('p');
    p.className = 'ai-message';
    p.innerHTML = `Lockdown Buddy: ${event.data}`;
    chatBody.appendChild(p);
}
