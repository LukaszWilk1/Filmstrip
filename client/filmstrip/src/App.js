import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from './PirvateRoute';
import Login from './login/Login';
import Home from './Home';
import Register from './Register';
import { AuthProvider } from './auth/auth';
import Movie from './Movie';
import TopRatedMovies from './TopRatedMovies';
import TopRatedSeries from './TopRatedSeries';
import Series from './Series';
import Search from './Search';
import PasswordChange from './PasswordChange';
import DeleteAccount from './delete_account/DeleteAccount';
import NotFound from './NotFound';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/movie/:movieId" element={<Movie/>}/>
          <Route path="/series/:seriesId" element={<Series/>}/>
          <Route path="/movies" element={<TopRatedMovies/>}/>
          <Route path="/series" element={<TopRatedSeries/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/passwordChange" element={<PasswordChange/>}/>
          <Route path="/deleteAccount" element={<DeleteAccount/>}/>
        </Route>
        <Route path="/register" element={<Register/>}/> 
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
