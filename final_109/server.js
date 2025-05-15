const WebSocket = require('ws');


// WebSocket Server Setup
const wss = new WebSocket.Server({ port: 8081 });
console.log('WebSocket server running on ws://localhost:8081');


// Handle WebSocket connections
wss.on('connection', (ws) => {
 console.log('New client connected');
 

 ws.on('message', (message) => {
   try {
     const data = JSON.parse(message);


     // Check for skybox update commands
     if (data.type === 'updateSkybox') {
       console.log(`Skybox file updated to: ${data.file}`);
       // Broadcast the skybox update to all connected clients
       wss.clients.forEach((client) => {
         if (client.readyState === WebSocket.OPEN) {
           client.send(JSON.stringify({
             type: 'updateSkybox',
             file: data.file,
           }));
         }
       });
     }
   } catch (err) {
     console.error('Error processing message:', err);
   }
 });


 ws.on('close', () => console.log('Client disconnected'));
});


