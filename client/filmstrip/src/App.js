import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from './PirvateRoute';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import { AuthProvider } from './auth';
import Movie from './Movie';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/movie/:movieId" element={<Movie/>}/>
          <Route path="/movies" element={<Home/>}/>
          <Route path="/series" element={<Home/>}/>
          <Route path="/favourite" element={<Home/>}/>
        </Route>
        <Route path="/register" element={<Register/>}/> 
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
