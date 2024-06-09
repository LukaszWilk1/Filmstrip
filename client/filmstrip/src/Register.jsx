import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "./auth";

const Register = () => {

    const navigate = useNavigate();

    const [regiserData, setRegisterData] = useState({
      login: '',
      password: '',
      repeatedPassword: '',
    });

    const auth = useAuth();

    const [areInputsEmpty, setAreInputsEmpty] = useState(false);
    const [arePasswordsDifferent, setArePasswordsDifferent] = useState(false);
    const [isLoginTaken, setIsLoginTaken] = useState(false);

    const handleBackClick = () => {
        navigate("/login");
    }

    const handleRegisterClick = () => {

      if(regiserData.login !== '' && regiserData.password !== '' && regiserData.repeatedPassword !==''){
        setAreInputsEmpty(false);
        if(regiserData.password===regiserData.repeatedPassword){
          document.getElementById("loginInput").disabled=true;
          document.getElementById("password").disabled=true;
          document.getElementById("repeatedPassword").disabled=true;
          document.getElementById("registerButton").disabled=true;
          document.getElementById("backButton").disabled=true;
          setArePasswordsDifferent(false);
          axios.post('/register', {...regiserData})
          .then(response => {
            document.getElementById("loginInput").disabled=false;
              document.getElementById("password").disabled=false;
              document.getElementById("repeatedPassword").disabled=false;
              document.getElementById("registerButton").disabled=false;
              document.getElementById("backButton").disabled=false;
            if(response.data.isLoginTaken){
              setIsLoginTaken(true);
            } else if(!response.data.isLoginTaken){
              auth.login(response.data);
              window.localStorage.setItem("isLoggedIn", response.data.login);
              navigate("/");
              setIsLoginTaken(false);
              document.getElementById("login").value='';
              document.getElementById("password").value='';
              document.getElementById("repeatedPassword").value='';
              setRegisterData({
                login: '',
                password: '',
                repeatedPassword: '',
              });
            } 
          })
          .catch(function (error) {
            console.log(error);
          });

        } else {
          setAreInputsEmpty(false);
          setArePasswordsDifferent(true);
        }
      } else {
        setAreInputsEmpty(true);
      }
    }

    const handleInputChange = e => {

      const {name, value} = e.target;

      setRegisterData(prevVal => {
        return {
          ...prevVal,
          [name]: value,
        };
      });
    };

    return (
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div id="register" className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg space-y-6 p-2">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="h-12 w-full content-center my-4 stroke-[#ffd500]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
</svg>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight color-yellow">Register</h2>
    </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 color-yellow">Login</label>
        <div className="mt-2">
          <input id="loginInput" htmlFor="login" name="login" value={regiserData.login} onChange={handleInputChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"></input>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 color-yellow">Password</label>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" value={regiserData.password} onChange={handleInputChange} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"></input>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 color-yellow">Repeat Password</label>
        </div>
        <div className="mt-2">
          <input id="repeatedPassword" name="repeatedPassword" type="password" value={regiserData.repeatedPassword} onChange={handleInputChange} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"></input>
        </div>
      </div>

      <div>
        {areInputsEmpty ? <p className="text-red-600 text-center">You must enter data into all fields!</p> : <></>}
        {arePasswordsDifferent ? <p className="text-red-600 text-center">Passwords are not the same!</p> : <></>}
        {isLoginTaken ? <p className="text-red-600 text-center">Login is taken! Please choose somthing else</p> : <></>}
      </div>

      <div>
        <button id="registerButton" type="submit" className="flex w-full justify-center rounded-md button-color px-3 py-1.5 text-sm font-semibold leading-6 color-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleRegisterClick}>Register</button>
      </div>
      <div>
        <button id="backButton" type="button" className="flex w-full justify-center rounded-md button-color px-3 py-1.5 text-sm font-semibold leading-6 color-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleBackClick}>Back</button>
      </div>
  </div>
</div>

    )
}

export default Register;