// index.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

// Initialize the Express app
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io with the server
const io = socketIo(server);

// Use CORS to allow communication between different domains
app.use(cors());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('P2P Chat Backend is running!');
});

// Handle Socket.io connections (for signaling)
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle "offer" event from a peer (signaling the start of a P2P connection)
  socket.on('offer', (offer, targetId) => {
    console.log(`Sending offer to ${targetId}`);
    io.to(targetId).emit('offer', offer, socket.id);
  });

  // Handle "answer" event (when the target peer responds to the offer)
  socket.on('answer', (answer, targetId) => {
    console.log(`Sending answer to ${targetId}`);
    io.to(targetId).emit('answer', answer, socket.id);
  });

  // Handle "ice-candidate" event (used to handle NAT traversal and establish connections)
  socket.on('ice-candidate', (candidate, targetId) => {
    console.log(`Sending ICE candidate to ${targetId}`);
    io.to(targetId).emit('ice-candidate', candidate, socket.id);
  });

  // When the user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Define the port and start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

