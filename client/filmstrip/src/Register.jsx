import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

    const handleBackClick = () => {
        navigate("/login");
    }

    const handleRegisterClick = () => {

      if(regiserData.login !== '' && regiserData.password !== '' && regiserData.repeatedPassword !==''){
        if(regiserData.password===regiserData.repeatedPassword){
          setArePasswordsDifferent(false);
          axios.post('http://localhost:3001/register', {...regiserData})
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

          console.log(regiserData);
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
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div id="register" class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg space-y-6 p-2">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm ">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"></img>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight color-yellow">Register</h2>
    </div>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 color-yellow">Login</label>
        <div class="mt-2">
          <input id="login" name="login" value={regiserData.login} onChange={handleInputChange} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"></input>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 color-yellow">Password</label>
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" value={regiserData.password} onChange={handleInputChange} autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"></input>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 color-yellow">Repeat Password</label>
        </div>
        <div class="mt-2">
          <input id="repeatedPassword" name="repeatedPassword" type="password" value={regiserData.repeatedPassword} onChange={handleInputChange} autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"></input>
        </div>
      </div>

      <div>
        {areInputsEmpty ? <p className="text-red-600 text-center">You must enter data into all fields!</p> : <></>}
        {arePasswordsDifferent ? <p className="text-red-600 text-center">Passwords are not the same!</p> : <></>}
      </div>

      <div>
        <button id="registerButton" type="submit" class="flex w-full justify-center rounded-md button-color px-3 py-1.5 text-sm font-semibold leading-6 color-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleRegisterClick}>Register</button>
      </div>
      <div>
        <button id="backButton" type="button" class="flex w-full justify-center rounded-md button-color px-3 py-1.5 text-sm font-semibold leading-6 color-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleBackClick}>Back</button>
      </div>
  </div>
</div>

    )
}

export default Register;