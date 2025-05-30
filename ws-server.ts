// // ws-server.ts
// import { createServer } from 'http';
// import WebSocket, { WebSocketServer } from 'ws';

// const server = createServer();
// const wss = new WebSocketServer({ server });

// wss.on('connection', (socket: WebSocket) => {
//   console.log('[WS] ✅ Client connected');

//   socket.on('message', (message: string | Buffer) => {
//     try {
//       const parsed = JSON.parse(message.toString());
//       const { stream, frame_id, timestamp } = parsed;

//       console.log(`[WS] 🔄 Frame from stream "${stream}"`);
//       console.log(`     Frame ID: ${frame_id} | Time: ${timestamp}`);
//       // Optional: Do something with parsed.image (base64)
//     } catch (err) {
//       console.error('[WS] ❌ Invalid message received:', message.toString());
//     }
//   });

//   socket.on('close', () => {
//     console.log('[WS] 🔌 Client disconnected');
//   });
// });

// const PORT = 3001;
// server.listen(PORT, () => {
//   console.log(`[WS] ✅ WebSocket server running at ws://localhost:${PORT}`);
// });
