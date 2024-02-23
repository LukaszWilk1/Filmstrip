import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from './PirvateRoute';
import Login from './Login';
import Home from './Home';
import Register from './Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path="/" element={<Home/>}/>
        </Route>
        <Route path="/register" element={<Register/>}/> 
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
