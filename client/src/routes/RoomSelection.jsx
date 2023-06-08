import "../App.css";
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";


const socket = io.connect("http://localhost:3001");

function RoomSelection() {
  //Room State
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
    redirect(room);
  };

  const redirect = (arg) => {
    window.location.href = '/game'
 }

  return (
    <>
      <div className="App">
        <input
          placeholder="Room Number..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}> Join Room</button>
    </div>
    </>
  );
}

export default RoomSelection;
