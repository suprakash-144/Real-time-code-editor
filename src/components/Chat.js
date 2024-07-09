import React, { useEffect, useState } from "react";
import ACTIONS from "../Actions";
import { useLocation } from "react-router-dom";
import { IoMdSend } from "react-icons/io";

const Chat = ({ socketRef, roomId, onMessageChange }) => {
  const [messageList, setMessageList] = useState([]);
  const [msg, setmsg] = useState("");

  const location = useLocation();
  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      handlesubmit();
    }
  };

  const handlesubmit = async () => {
    if (msg !== "") {
      const message = {
        name: location.state?.username,
        msg: msg,
      };
      setmsg("");
      // messageref.current.push(message);
      await socketRef.current.emit(ACTIONS.Message, {
        roomId,
        message: message,
      });

      setMessageList((list) => [...list, message]);
    }
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("Received", ({ message }) => {
        // console.log(message);
        setMessageList((list) => [...list, message]);
      });
    }
  }, [socketRef.current]);

  return (
    <div className="d-flex gap-1 rounded-3 bg-black flex-column h-50  mt-3 border border-black">
      <div className=" p-2 px-2 d-flex gap-2 flex-column  overflow-auto w-100 h-100 chatbox ">
        {messageList.map((item, key) => {
          return (
            <div
              key={key}
              className={` d-flex rounded-3 ${
                item.name === location.state?.username
                  ? "justify-content-end "
                  : "align-items-start "
              } `}
            >
              <div
                className={`p-1 px-2 d-flex w-75 ${
                  item.name === location.state?.username
                    ? " bg-dark "
                    : " bg-success "
                } rounded-3 gap-1 flex-column`}
              >
                <p>{item.name}</p>
                <p>{item.msg}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-flex ">
        <input
          type="text"
          className="form-control w-75"
          placeholder="Send Message"
          onKeyUp={handleInputEnter}
          onChange={(e) => setmsg(e.target.value)}
          value={msg}
        />
        <button onClick={handlesubmit} className="btn btn-success w-25">
          <IoMdSend size={25} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
