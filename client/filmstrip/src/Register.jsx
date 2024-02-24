import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = prop => {

    const navigate = useNavigate();

    const [regiserData, setRegisterData] = useState({
      login: '',
      password: '',
      repeatedPassword: '',
    });

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
          document.getElementById("login").disabled=true;
          document.getElementById("password").disabled=true;
          document.getElementById("repeatedPassword").disabled=true;
          document.getElementById("registerButton").disabled=true;
          document.getElementById("backButton").disabled=true;
          setArePasswordsDifferent(false);
          axios.post('http://localhost:3001/register', {...regiserData})
          .then(response => {
            document.getElementById("login").disabled=false;
              document.getElementById("password").disabled=false;
              document.getElementById("repeatedPassword").disabled=false;
              document.getElementById("registerButton").disabled=false;
              document.getElementById("backButton").disabled=false;
            if(response.data.isLoginTaken){
              setIsLoginTaken(true);
            } else if(!response.data.isLoginTaken){
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
      <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"></img>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight color-yellow">Register</h2>
    </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 color-yellow">Login</label>
        <div className="mt-2">
          <input id="login" htmlFor="login" name="login" value={regiserData.login} onChange={handleInputChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"></input>
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