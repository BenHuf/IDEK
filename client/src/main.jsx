import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import Home from './routes/Home.jsx'
import RoomSelection from './routes/RoomSelection.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoomSelection />,
  },
  {
    path: "/game",
    element: <Home />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
