const net = require('net');
const fs = require('fs');

const server = net.createServer();

let clients = [];

server.on('connection', (client) => {
  console.log('Client connected');

  client.write('Welcome to the chat server');

  clients.forEach((otherClient) => {
    otherClient.write(`${client.name} has joined the chat`);
  });
  clients.push(client);

  client.on('data', (data) => {
    console.log(`${client.name}: ${data}`);
    clients.forEach((otherClient) => {
      if (otherClient !== client) {
        otherClient.write(`${client.name}: ${data}`);
      }
    });
  });

  client.on('end', () => {
    console.log(`${client.name} disconnected`);
    clients = clients.filter((otherClient) => otherClient !== client);
    clients.forEach((otherClient) => {
      otherClient.write(`${client.name} has left the chat`);
    });
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

process.on('SIGINT', () => {
  console.log('Shutting down server');
  server.close(() => {
    console.log('Server closed');
    process.exit();
  });
});
