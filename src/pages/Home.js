import React, { useState } from "react";
import "../App.css";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidV4 } from "uuid";

import { useNavigate } from "react-router-dom";
//useNavigate is used to navigate to different routes

import NavBar from "../components/NavBar";
function Home() {
  const [roomID, setRoomID] = useState("");
  const [roomCreated, setRoomCreated] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const createNewRoom = (e) => {
    e.preventDefault();
    // const id = Math.floor(Math.random() * 10000000000); to improve security use uuid
    const id = uuidV4();
    setRoomID(id);
    toast.success("Room Created");
    setRoomCreated(true);
  };
  const JoinRoom = () => {
    // TODO: if room id doesn't exist, show error
    setRoomID("");
    setRoomCreated(false);
  };
  const handleSubmit = (e) => {
    if (!roomID || !username) {
      toast.error("ROOM ID & username is required");
      return;
    }
    e.preventDefault();

    navigate(`/editor/${roomID}`, {
      state: {
        username,
        // to pass data from one route to another
      },
    });
  };
  return (
    <div className="homepage">
      <NavBar />

      <div className="FormContainer">
        <form className="Form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={roomID}
            placeholder="Enter Room ID"
            className="FormInput"
            onChange={(e) => setRoomID(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Your Username"
            className="FormInput"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit" className="btn joinBtn">
            {roomCreated ? "Create" : "Join"}
          </button>

          <span>
            {!roomCreated ? (
              <>
                Do not have an Invite?{" "}
                <div onClick={(e) => createNewRoom(e)} className="create-room">
                  Create Room
                </div>
              </>
            ) : (
              <>
                Already have an Invite?{" "}
                <div onClick={JoinRoom} className="create-room">
                  Join Room by RoomID
                </div>
              </>
            )}
            <Toaster />
          </span>
        </form>
      </div>
    </div>
  );
}

export default Home;
