import React from "react";
import { useNavigate } from "react";
function EditorPage() {
  return (
    <div className="editorpage">
      <div className="left-panel">
        <div className="left-panel-inner">
          <h3>Connected</h3>
          <div className="user-list">USER 1</div>
        </div>
        <div className="left-panel-btns">
        <button className="btn copyBtn">Copy ROOM ID</button>

        <button className="btn leaveBtn">Leave</button>
        </div>
      </div>
      <div className="right-panel">Here will come editor</div>
    </div>
  );
}

export default EditorPage;
