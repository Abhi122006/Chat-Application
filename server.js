const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('✅ User connected');

  socket.on('chat message', (msg) => {
    console.log('💬 Message from user:', msg);

    io.to(socket.id).emit('chat message', `You: ${msg}`);

    const reply = getBotReply(msg);
    setTimeout(() => {
      io.to(socket.id).emit('chat message', `Bot: ${reply}`);
    }, 1000);
  });
});

function getBotReply(msg) {
  const lower = msg.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi')) {
    return 'Hello there! 👋 How can I help you?';
  } else if (lower.includes('how are you')) {
    return "I'm doing great, thanks for asking! 😊 What about you?";
  } else if (lower.includes('your name')) {
    return "I'm TechBot, your virtual assistant 🤖";
  } else if (lower.includes('weather')) {
    return "I'm not connected to the weather right now, but it looks sunny in code! ☀️";
  } else if (lower.includes('bye')) {
    return "Goodbye! Have a nice day 👋";
  } else if (lower.includes('help')) {
    return "You can ask me about my name, the weather, how I am, or just say hello!";
  } else if (lower.endsWith('?')) {
    return "That's a good question! Let me think about it... 🤔";
  } else {
    return "Interesting! Tell me more or try asking a question. 💬";
  }
}

server.listen(3000, () => {
  console.log('🚀 Chat app running at http://localhost:3000');
});