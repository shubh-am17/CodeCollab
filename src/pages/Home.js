import React, { useState } from "react";
import "../App.css";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [roomID, setRoomID] = useState("");
  const [roomCreated, setRoomCreated] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 10000000000);
    console.log(id);
    setRoomID(id);
    setRoomCreated(true);
  };
  const JoinRoom = () => {
    // TODO: if room id doesn't exist, show error
    setRoomID("");
    setRoomCreated(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    navigate(`/editor/${roomID}`, {
        state: {
            username,
            // to pass data from one route to another
        },
    });
  };
  return (
    <div className="homepage">
      <div className="FormContainer">
        <form className="Form" onSubmit={handleSubmit}>
          <input
            type="text"
            defaultValue={roomID}
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
          <button type="submit" className="btn joinBtn">{roomCreated ? "Create" : "Join"}
          </button>

          <span>
            {!roomCreated ? (
              <>
                Do not have an Invite?{" "}
                <div onClick={e=>createNewRoom(e)} className="create-room">
                  Create Room
                </div>
              </>
            ) : (
              <>
                Already have an Invite?{" "}
                <div onClick={JoinRoom} className="create-room">
                  Join Room
                </div>
              </>
            )}
          </span>
        </form>
      </div>
    </div>
  );
}

export default Home;
