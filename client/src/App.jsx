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

  // Typing States
  const [typing, setTyping] = useState("");
  const [typingReceived, setTypingReceived] = useState("");

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

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
    console.log("sending message: " + message)
  };

  const sendMove = (value) => {
    socket.emit("send_move", { value, room });
  };

  const sendTyping = (value) => {
    socket.emit("send_typing", { value, room });
    console.log(value + ' typing is')
  };

  useEffect(() => {

    function onReceiveMessage(data) {
      setMessageReceived(data.message);
    };

    function onReceiveMove(data) {
      setMoveReceived(data.value);
      console.log(moveReceived + ' move Received is')
    };

    function onReceiveTyping(data) {
      setTypingReceived(data.value);
      console.log(typingReceived + ' move Received is')
    };

    socket.on("receive_message", onReceiveMessage);
    socket.on("receive_move", onReceiveMove);
    socket.on("receive_typing", onReceiveTyping);

    return () => {
      socket.off("receive_message", data);
      socket.off("receive_move", data);
      socket.off("receive_typing", data);
    };

  }, [socket]);
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
        onChange={(event) => {
          setMessage(event.target.value),
          // setTyping(event.target.value),
          sendTyping(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
      <h1> Typing:</h1>
      {typingReceived}
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