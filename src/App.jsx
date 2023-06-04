import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/cards.jsx'
import Cards from './components/cards.jsx'
import Board from './components/board.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [space, setSpace] = useState(0)
  const [data, setData] = useState('');


  const handleData = (recievedData) => {
    console.log(recievedData);
    setSpace((space) => space += recievedData);
    console.log(recievedData + ' data is');
    console.log(space + ' space is');
  };

  return (
    <>
      <div className="board">
        <button onClick={() => setSpace((space) => space + Math.floor(Math.random() * 12 ) + 1)}>
          space is {space}
        </button>
      </div>

      <Cards onData={handleData} />
      <Board />
    </>
  )
}

export default App
