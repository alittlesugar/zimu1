document.addEventListener('DOMContentLoaded', function() {
    loadMessages();

    document.getElementById('sendButton').addEventListener('click', function() {
        const messageInput = document.getElementById('messageInput');
        const messageText = messageInput.value.trim();

        if (messageText !== '') {
            displayMessage('You', messageText);
            saveMessage('You', messageText);
            messageInput.value = '';
        }
    });

    function displayMessage(user, text) {
        const messagesDiv = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        const userSpan = document.createElement('span');
        userSpan.classList.add('user');
        userSpan.textContent = user + ':';

        const textSpan = document.createElement('span');
        textSpan.classList.add('text');
        textSpan.textContent = text;

        messageDiv.appendChild(userSpan);
        messageDiv.appendChild(textSpan);
        messagesDiv.appendChild(messageDiv);

        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function saveMessage(user, text) {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ user, text });
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function loadMessages() {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.forEach(message => {
            displayMessage(message.user, message.text);
        });
    }
});
