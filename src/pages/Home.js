import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

const Home = () => {
  const navigate = useNavigate();
  const { authchange, signout } = useContext(FirebaseContext);
  const { user, logedin } = authchange();

  useEffect(() => {
    if (!logedin) {
      navigate("/");
    }
  }, [logedin]);

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    signout();
  };
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("ROOM ID & username is required");
      return;
    }

    // Redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="homePageWrapper">
      <div className="position-absolute top-0 end-0 m-4">
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src="/code-sync.png"
          alt="code-sync-logo"
        />
        <h4 className="mainLabel">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="USERNAME"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleInputEnter}
          />
          <button className=" w-25  btn btn-success" onClick={joinRoom}>
            Join
          </button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <span onClick={createNewRoom} href="" className="createNewBtn">
              new room
            </span>
          </span>
        </div>
      </div>
      <footer>
        <h4>Built with 💛</h4>
      </footer>
    </div>
  );
};

export default Home;
