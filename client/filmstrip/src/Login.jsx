import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth.jsx";
import axios from "axios";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ login: '', password: '' });
  const [areInputsEmpty, setAreInputsEmpty] = useState(false);
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);
  const [wrongUser, setWrongUser] = useState(false);

  const handleInputChange = e => {
      const { name, value } = e.target;
      setLoginData(prevVal => ({ ...prevVal, [name]: value }));
  };

  const handleLoginClick = () => {
      if (loginData.login !== '' && loginData.password !== '') {
          setAreInputsEmpty(false);
          axios.post('https://filmstrip.onrender.com/login', { ...loginData })
              .then(response => {
                  if (!response.data.wrongUser) {
                      setWrongUser(false);
                      if (!response.data.isPasswordCorrect) setIsPasswordWrong(true);
                      else {
                          setIsPasswordWrong(false);
                          auth.login(response.data);
                          navigate("/");
                      }
                  } else {
                      setWrongUser(true);
                  }
              })
              .catch(error => console.error(error));
      } else {
          setAreInputsEmpty(true);
      }
  };

  const handleRegisterClick = () => {
      navigate("/register");
  };

    return (
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div id="login" className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border space-y-6 p-2 rounded-lg">

  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="h-12 w-full content-center my-4 stroke-[#ffd500]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
</svg>

    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight color-yellow">FILMSTRIP</h2>
  </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 color-yellow">Login</label>
        <div className="mt-2">
          <input id="loginInput" name="login" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" onChange={handleInputChange} value={loginData.login}></input>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 color-yellow">Password</label>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" onChange={handleInputChange} value={loginData.password}></input>
        </div>
      </div>

      <div>
        {areInputsEmpty ? <p className="text-red-600 text-center">You must enter data into all fields!</p> : <></>}
        {isPasswordWrong ? <p className="text-red-600 text-center">Wrong password!</p> : <></>}
        {wrongUser ? <p className="text-red-600 text-center">There is no user with this login!</p> : <></>}
      </div>

      <div>
        <button id="loginButton" type="button" className="flex w-full justify-center rounded-md button-color px-3 py-1.5 text-sm font-semibold leading-6 color-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleLoginClick}>Log in</button>
      </div>
      <div>
        <button id="registerButton" type="button" className="flex w-full justify-center rounded-md button-color px-3 py-1.5 text-sm font-semibold leading-6 color-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleRegisterClick}>Register</button>
      </div>
  </div>
</div>

    )
}

export default Login