
import ARComponents from "./components/vanilla/ARComponents";
import React from 'react';

function App() {
  return (
    <div>
      <ARComponents />
    </div>
  );
}
export default App;


/*
import React from "react";
import Login from "./Login";
import Register from "./Register";
import Home from "./components/Home";
//import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Login/>}></Route>
        <Route path = '/register' element = {<Register/>}></Route>
        <Route path = '/home' element = {<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
*/