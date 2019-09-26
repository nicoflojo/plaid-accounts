import React from 'react';
import './App.css';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

function App() {
  return (
    <div>
      <h1>
        <Navbar />
        <Landing />
      </h1>
    </div>
  );
}

export default App;
