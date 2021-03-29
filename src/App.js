import React, { useState, useEffect } from 'react';
import './App.css';
import Pokemon from "./component/Pokemon";
import axios from "axios";

function App() {

  return (
    <div>
      <Pokemon />
    </div>
  );
}

export default App;
