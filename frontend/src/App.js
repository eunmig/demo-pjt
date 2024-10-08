// App.js
import React from "react";
import './App.css';
import Calendar from "./components/Calendar/Calendar";
import axios from 'axios'

const App = () => {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
};

export default App;