import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth.jsx";
import axios from "axios";

const Login = () => {

    const auth = useAuth();

    const [loginData, setLoginData] = useState({
      login: '',
      password: '',
    });
    const [areInputsEmpty, setAreInputsEmpty] = useState(false);
    const [isPasswordWrong, setIsPasswordWrong] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = e => {

      const {name, value} = e.target;

      setLoginData(prevVal => {
        return {
          ...prevVal,
          [name]: value,
        };
      });
    };

    const handleLoginClick = () => {
      if(loginData.login !== '' && loginData.password !== ''){
        setAreInputsEmpty(false);
        document.getElementById("loginInput").disabled=true;
        document.getElementById("password").disabled=true;
        document.getElementById("loginButton").disabled=true;
        document.getElementById("registerButton").disabled=true;
        axios.post('http://localhost:3001/login', {...loginData})
          .then(response => {
            document.getElementById("loginInput").disabled=false;
            document.getElementById("password").disabled=false;
            document.getElementById("loginButton").disabled=false;
            document.getElementById("registerButton").disabled=false;
            if(!response.data.isPasswordCorrect) setIsPasswordWrong(true);
            else{
              setIsPasswordWrong(false);
              auth.login(response.data.login);
              window.localStorage.setItem("isLoggedIn", response.data.login);
              navigate("/");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        setAreInputsEmpty(true);
      }
    }

    const handleRegisterClick = () => {
        navigate("/register");
    };

    return (
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div id="login" class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border space-y-6 p-2 rounded-lg">

  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"></img>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight color-yellow">FILMSTRIP</h2>
  </div>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 color-yellow">Login</label>
        <div class="mt-2">
          <input id="loginInput" name="login" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" onChange={handleInputChange} value={loginData.login}></input>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 color-yellow">Password</label>
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" onChange={handleInputChange} value={loginData.password}></input>
        </div>
      </div>

      <div>
        {areInputsEmpty ? <p className="text-red-600 text-center">You must enter data into all fields!</p> : <></>}
        {isPasswordWrong ? <p className="text-red-600 text-center">Wrong password!</p> : <></>}
      </div>

      <div>
        <button id="loginButton" type="button" class="flex w-full justify-center rounded-md button-color px-3 py-1.5 text-sm font-semibold leading-6 color-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleLoginClick}>Log in</button>
      </div>
      <div>
        <button id="registerButton" type="button" class="flex w-full justify-center rounded-md button-color px-3 py-1.5 text-sm font-semibold leading-6 color-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleRegisterClick}>Register</button>
      </div>
  </div>
</div>

    )
}

export default Login