import "./App.css";
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import Cards from './components/cards.jsx'
import Board from './components/board.jsx'

const socket = io.connect("http://localhost:3001");

function App() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  // Game State
  const [move, setMove] = useState('');
  const [moveReceived, setMoveReceived] = useState('');
  const [space, setSpace] = useState(0);
  const [data, setData] = useState(''); // data from card component

  const handleData = (receivedData) => {
    console.log(receivedData);
    setSpace((space) => space += receivedData);
    console.log(receivedData + ' data is');
    console.log(space + ' space is');
  };

  const handleRoll = () => {
    let roll = Math.floor(Math.random() * 6 ) + 1;
    setSpace((space) => space + roll);
    console.log(space + ' space is')
    setMove(roll);
    console.log(move + ' move is')
    sendMove(roll);
    console.log(moveReceived + ' move Received is')
    console.log(roll + ' roll is')
  };

  const handleMessageChange = (event) => {
    const { value } = event.target;
    setMessage(value);
    sendMessage(value);
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = (value) => {
    socket.emit("send_message", { value, room });
  };

  const sendMove = (value) => {
    socket.emit("send_move", { value, room });
  };

  useEffect(() => {

    function onReceiveMessage(data) {
      setMessageReceived(data.message);
    };

    function onReceiveMove(data) {
      setMoveReceived(data.value);
      console.log(moveReceived + ' move Received is')
    };

    socket.on("receive_message", onReceiveMessage);
    socket.on("receive_move", onReceiveMove);

    return () => {
      socket.off("receive_message", data);
      socket.off("receive_move", data);
    };

  }, [socket, setMoveReceived, moveReceived, setMessageReceived, messageReceived]);
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
        <input
          placeholder="Message..."
          onChange={handleMessageChange}
        />
        <button onClick={sendMessage}> Send Message</button>
        <h1> Message:</h1>
        {messageReceived}
      </div>

      <div className="board">
         <button onClick={handleRoll}>
           space is {space}
         </button>
         <p>Move: {move}</p>
         <p>Move Received: {moveReceived}</p>
       </div>

       <Cards onData={handleData} />
       <Board />
    </>
  );
}

export default App;