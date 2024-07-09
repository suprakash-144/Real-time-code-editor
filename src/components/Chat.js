import React, { useEffect, useRef, useState } from "react";
import ACTIONS from "../Actions";
import { useLocation } from "react-router-dom";

const Chat = ({ socketRef, roomId, onMessageChange }) => {
  const messageref = useRef([]);
  const [messagelist, setmessagelist] = useState([]);
  const [msg, setmsg] = useState("");

  const location = useLocation();
  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      handlesubmit();
    }
  };

  const handlesubmit = () => {
    if (msg !== "") {
      const message = {
        name: location.state?.username,
        msg: msg,
      };
      setmsg("");
      messageref.current.push(message);
      socketRef.current.emit(ACTIONS.Message, {
        roomId,
        message: messageref.current,
      });
    }
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("Received", ({ message }) => {
        console.log(message);
        if (message !== null) {
          messageref.current.push(message);
        }
        onMessageChange(messageref);
        console.log(messageref.current);
      });
    }
  }, [socketRef.current]);

  return (
    <div className="d-flex flex-column h-75">
      <div className="d-flex  overflow-auto w-100">
        {/* {messageref.current.forEach((item, key) => {
          return <div key={key}>{item.name}</div>;
        })} */}
      </div>
      <div className="d-flex h-25">
        <input
          type="text"
          className="form-control w-75"
          placeholder="Send Message"
          onKeyUp={handleInputEnter}
          onChange={(e) => setmsg(e.target.value)}
          value={msg}
        />
        <button onClick={handlesubmit} className="btn btn-success w-25">
          {" "}
          d
        </button>
      </div>
    </div>
  );
};

export default Chat;
