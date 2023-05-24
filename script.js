document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const messages = document.getElementById('messages');
  const inputMessage = document.getElementById('inputMessage');
  const sendButton = document.getElementById('sendButton');

  // Event handler når skjemaet sendes
  const sendMessage = () => {
    const message = inputMessage.value;
    if (message.trim() !== '') {
      socket.emit('chat message', message);
      inputMessage.value = '';
    }
  };

  // Event handler for å motta meldinger fra serveren
  const receiveMessage = (message) => {
    const li = document.createElement('li');
    li.textContent = message;
    messages.appendChild(li);
  };

  // Event handler når en melding mottas fra serveren
  socket.on('chat message', receiveMessage);

  // Legg til event listener for send-knappen
  sendButton.addEventListener('click', sendMessage);

  // Legg til event listener for Enter-tasten
  inputMessage.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
});
