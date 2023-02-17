import React, {useEffect} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.scss';
import {Todos} from "./features/todos/Todos";

import axios from "axios";
import AgGridSample from "./features/ag-grid-sample/AgGridSample";
axios.defaults.withCredentials = true;

const instance = axios.create(
    {withCredentials: true}
)

function App() {

  useEffect(() => {

    fetch('http://localhost:8080/hello', {credentials: 'include'}).then((resp: any) => {
      console.log('resp from server', resp);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <Todos />
        <AgGridSample />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
