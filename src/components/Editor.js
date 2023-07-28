import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../Actions";

const Editor = ({ socketRef, roomId }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineWrapping: true,
          scrollbarStyle: "null",
          styleActiveLine: true,
          matchBrackets: true,
        }
      );
      //CHANGES store all history of changes like undo redo
      //instance is the editor instance
      editorRef.current.on("change", (instance, changes) => { //provided by the CodeMirror library 
        const { origin } = changes; //what caused the change
        const code = instance.getValue();
        console.log(code); //get the value of the editor

        if (origin != "setValue") { //else it will go into infinite loop
          console.log("emit changes");
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            code,
            roomId,
          });
        }

        
      });
    }
    init();
  }, [editorRef.current]);

  useEffect(() => {
    if(!socketRef.current) return; //if socket is not connected  

    //Listen for the code change event emmited from line 72 in server.js
    socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        
        editorRef.current.setValue(code);
        
      });
  }, [socketRef.current]);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
