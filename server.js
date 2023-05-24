const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Sett opp statisk filserver for å tjene HTML-siden
app.use(express.static('public'));

// Event handler når en klient kobler til
io.on('connection', (socket) => {
  console.log('En klient har koblet til');

  // Event handler for å motta meldinger fra klienten
  socket.on('chat message', (message) => {
    console.log('Melding mottatt:', message);

    // Sender meldingen til alle tilkoblede klienter
    io.emit('chat message', message);
  });

  // Event handler når en klient kobler fra
  socket.on('disconnect', () => {
    console.log('En klient har koblet fra');
  });
});

// Start serveren
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Serveren lytter på port ${port}`);
});
