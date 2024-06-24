import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { logger } from './logger';
import connectDB from './db';
import cors from 'cors';
import globalRouter from './global-router';
import ChatService from "./chat/chat.service";
import ChatController from "./chat/chat.controller";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB().then(() => console.log('Connected to DB')).catch(e => console.log(e));

app.use(logger);
app.use(express.json());
app.use(cors());
app.use('/api/v1/', globalRouter);

const server = createServer(app);

const wss = new WebSocketServer({ server });

const chatService = new ChatService();
const chatController = new ChatController(chatService);

wss.on('connection', (ws) => {
  console.log('A user connected');

  ws.on('message', async (message) => {
    const userMessage = message.toString();
    await chatController.handleWebSocketConnection(ws, userMessage);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  ws.on('close', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});
