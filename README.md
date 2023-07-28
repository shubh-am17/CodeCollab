Welcome to the Collaborative Real-Time Code Editor platform! This project aims to provide a collaborative coding environment where multiple users can simultaneously edit and view code in real-time. The platform is built using React, Express, and Socket.IO.

Features

Real-time code synchronization: Changes made by any user are instantly reflected on the screens of all connected users.
Collaborative Editing: Multiple users can collaborate and edit the same code simultaneously.
Syntax Highlighting: The code editor provides syntax highlighting for popular programming languages, enhancing code readability.
Room-Based Collaboration: Users can create and join different code editing rooms to collaborate on different projects.


Getting Started
To run the Collaborative Real-Time Code Editor platform locally on your machine, follow these steps:

Prerequisites
Node.js and npm (Node Package Manager) should be installed on your machine.


Installation
Clone the repository to your local machine:

Install the dependencies for the client and server:

npm install


Running the Development Server

Start the server:

nodemon server.js

The server will be running at http://localhost:5000.

Start the client (in a separate terminal window):

npm start

The React client will be running at http://localhost:3000.


Open your browser and navigate to http://localhost:3000 to access the Collaborative Real-Time Code Editor platform.

How It Works
Users can join an existing room or create a new room by providing a unique room ID and their username.

Once in the room, users can see the presence of other collaborators in the user list.

Any changes made to the code by one user are instantly synced to all other connected users, creating a real-time collaborative editing experience.


TODO:

Users can communicate through chat or other messaging features to enhance collaboration further.

User Presence: Users are informed about the presence of other collaborators in the code editor.
