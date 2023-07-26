import React ,{useState} from "react";
import { useNavigate } from "react";
import Clients from "../components/Clients";
import Editor from "../components/Editor";
function EditorPage() {
  const [clients, setClients] = useState([
    { socketid: 1, username: "Shubham kumar" },
    { socketid: 2, username: "ayush k" },
    { socketid: 3, username: "mohan r"}
  ]);
  return (
    <div className="editorpage">
      <div className="left-panel">
        <div className="left-panel-inner">
          <h3>Connected</h3>
          <div className="user-list">
            {clients.map((client)=>{
              return<>
              <Clients key={client.socketid} username={client.username}>
                </Clients>  
              </>
              
            })}
            
          </div>
        </div>
        <div className="left-panel-btns">
          <button className="btn copyBtn">Copy ROOM ID</button>

          <button className="btn leaveBtn">Leave</button>
        </div>
      </div>
      <div className="right-panel">
        <Editor />
      </div>
    </div>
  );
}

export default EditorPage;
