const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const ACTIONS = require('./src/Actions');
const port = process.env.PORT || 5000;
const cors=require('cors');
const { Server } = require('socket.io');

app.use(cors());
//class which handles WebSocket connections and events on the server-side.

const server = http.createServer(app);
//the same happens inside app.listen


const io = new Server(server);
// instance of socket.io server class

// to map the socket id to the username
const userSocketMap = new Map();
// TODO: THIS IS STORED IN THE SERVER, SO IF SERVER RESTARTS, ALL THE DATA IS LOST- CAN USE REDIS FOR PERSISTENCE
//event, callback which will be executed after that event detection


function getAllConnectedClients(roomId) {

    const clientsSet = io.sockets.adapter.rooms.get(roomId) || new Set();
    // Retrieve the Set of socket IDs for the given room

    const clientsArray = [...clientsSet];
    // Convert the Set to an array of socket IDs using the spread operator
    // Map the socket IDs to an array of objects containing socketId and username
    return clientsArray.map((socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId], // Use 'get' instead of square brackets
      };
    });
  }


//   io.on is used to handle server-wide events or events that are not specific to a particular socket, while socket.on is used to handle events for an individual socket connection.

io.on('connection', (socket) => {
    // console.log(`Socket connected: ${socket.id}`);

    //Listen for the join event
    socket.on(ACTIONS.JOIN, ({ roomId, username }) => { //emitted by line 42 in Editorpage.js
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        //if it exist join it, else create it

        //need to notify existing users that a new user has joined

        const clients = getAllConnectedClients(roomId);

        clients.forEach(({ socketId }) => {

            //emit joined event to all the clients in the room expect the one who joined
            io.to(socketId).emit(ACTIONS.JOINED, {
                socketId: socket.id,
                username,
                clients,
            })
        })
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ code, roomId }) => {  //coming from client
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            if (socketId !== socket.id) {
                //emit the code change event to all the clients in the room expect the one who changed the code
                io.to(socketId).emit(ACTIONS.CODE_CHANGE, {
                    code,
                })
            }
        })
    })

    //listen for the disconnect event
    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms]; 
        //returns an object with the room IDs as keys and true as the value for each room the socket is joined to.
        
        //display that a user has left the room to all the members all the rooms he has joined
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        })
        userSocketMap.delete(socket.id);

        socket.leave(); //this remove the disconnecting socket from all rooms it is currently joined to.
    })

    
});


server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
