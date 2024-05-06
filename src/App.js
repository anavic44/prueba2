import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RegistrarProyecto } from "./RegisterScene";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path = '/' element = {<Login/>}></Route> */}
        <Route path='/' element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path = '/register' element = {<Register/>}></Route>
        <Route path = '/navbar' element = {<NavBar/>}></Route>
        {/* <Route path = '/projects' element = {<Projects2/>}></Route> */}
        <Route path="/ar" element={<ARComponents />}></Route>
        <Route path="/ar/:id_objeto" element={<ARComponents />}></Route>
        <Route path='/projects/:userId' element={<Projects2 />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;

//      <ARComponents />


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