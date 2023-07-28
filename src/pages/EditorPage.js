import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import ACTIONS from "../Actions";
import Clients from "../components/Clients";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";

function EditorPage() {
  const socketRef = useRef(null);
  // reference to the WebSocket connection object
  // By using useRef, the socketRef variable retains its value across re-renders. This prevents multiple connection attempts whenever the component re-renders. The WebSocket connection object will be stored in the socketRef.current, and it will be accessible throughout the component's lifetime without the need for reconnecting every time the component updates.

  const location = useLocation();

  const { roomId } = useParams();
  //SAME NAME AS IN ROUTING
  // const username = location.state?.username;

  const reactNavigator = useNavigate();

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket(); //returns a promise
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }

      //THIS ACTION WOULD BE EMITTED BY CLIENT ON JOINING
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      //Listen for the joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          //emmitted by server.js when it listens to join event
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          setClients(clients);
          //passing the clients array to the state
          // console.log(clients);
        }
      );

      // listen for disconnect event
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.error(`${username} left the room.`);
        setClients((clients) => {
          return clients.filter((client) => client.socketId !== socketId);
        });
      });
    };
    // what if init was called outside useEffect ? = If you call the init function multiple times in your component, the WebSocket connection will be established each time the function is called. This could lead to multiple WebSocket connections, which might not be the intended behavior.
    //

    init();

    //CLEANING UP
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);
  //blank array means it will run only once

  if (!location.state?.username) {
    toast.error("Please enter a username.");
    <Toaster />;
    return <Navigate to="/" />;
  }

  function handleCopy() {
    navigator.clipboard.writeText(roomId);
    toast.success("Copied to clipboard.");
  }

  function handleLeave() {
    socketRef.current.disconnect();
    reactNavigator("/");
    //only redirecting user to home will not work as the socket connection is still open
  }
  return (
    <div className="editorpage">
      <div className="left-panel">
        <h1 className="logo">CodeCollab.</h1>

        <div className="left-panel-inner">
          <Toaster />
          <h3>Connected</h3>
          <div className="user-list">
            {clients.map((client) => (
              <Clients key={client.socketId} username={client.username} />
            ))}

            {/* //TODO: display name of current user as YOU keeping same avatar */}
          </div>
        </div>
        <div className="left-panel-btns">
          <button className="btn copyBtn" onClick={handleCopy}>
            Copy ROOM ID
          </button>

          <button className="btn leaveBtn" onClick={handleLeave}>
            Leave
          </button>
        </div>
      </div>
      <div className="right-panel">
        <Editor socketRef={socketRef} roomId={roomId} />
      </div>
    </div>
  );
}

export default EditorPage;
