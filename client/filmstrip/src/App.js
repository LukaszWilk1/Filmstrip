import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from './private_route/PirvateRoute';
import Login from './login/Login';
import Home from './home/Home';
import Register from './register/Register';
import { AuthProvider } from './auth/auth';
import Movie from './movie/Movie';
import TopRatedMovies from './top_rated_movies/TopRatedMovies';
import TopRatedSeries from './top_rated_series/TopRatedSeries';
import Series from './series/Series';
import Search from './search/Search';
import PasswordChange from './password_change/PasswordChange';
import DeleteAccount from './delete_account/DeleteAccount';
import NotFound from './not_found/NotFound';

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
