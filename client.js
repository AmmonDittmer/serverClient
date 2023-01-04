const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.createConnection({ port: 3000 }, () => {
  console.log('Connected to server');
});

client.on('data', (data) => {
  console.log(data.toString());
});

rl.on('line', (input) => {
  client.write(input);
});

process.on('SIGINT', () => {
  console.log('Disconnecting from server');
  client.end();
});
