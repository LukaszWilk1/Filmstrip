import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../auth/auth";

const PasswordChange = () => {

    const navigate = useNavigate();

    const [changePasswordData, setChangePasswordData] = useState({
      newPassword: '',
      repeatedPassword: '',
    });

    const auth = useAuth();

    const [areInputsEmpty, setAreInputsEmpty] = useState(true);
    const [arePasswordsDifferent, setArePasswordsDifferent] = useState(false);

    const handleChangePasswordClick = () => {

      if(changePasswordData.newPassword !== '' && changePasswordData.repeatedPassword !==''){
        setAreInputsEmpty(true);
        if(changePasswordData.newPassword === changePasswordData.repeatedPassword){
            setArePasswordsDifferent(false);
            const login = auth.user.login;
            axios.post(`/api/passwordChange`, {...changePasswordData, login})
            .then(response => {
                navigate("/");
            })
            .catch(function (error) {
                console.log(error);
              });
        } else {
            setArePasswordsDifferent(true);
        }
      } else {
        setAreInputsEmpty(false);
      }
    }

    const handleInputChange = e => {

      const {name, value} = e.target;

      setChangePasswordData(prevVal => {
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
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight color-yellow">Change Password</h2>
    </div>

      <>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 color-yellow">New Password</label>
        </div>
        <div className="mt-2">
        <input id="password" name="newPassword" type="password" value={changePasswordData.newPassword} onChange={handleInputChange} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"></input>
        </div>
      </>

      <>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 color-yellow">Repeat Password</label>
        </div>
        <div className="mt-2">
          <input id="repeatedPassword" name="repeatedPassword" type="password" value={changePasswordData.repeatedPassword} onChange={handleInputChange} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"></input>
        </div>
      </>

      <>
        {areInputsEmpty ? <></> : <p className="text-red-600 text-center">You must enter data into all fields!</p>}
        {arePasswordsDifferent ? <p className="text-red-600 text-center">Passwords are not the same!</p> : <></>}
      </>

      <>
        <button id="registerButton" type="submit" className="flex w-full justify-center rounded-md button-color px-3 py-1.5 text-sm font-semibold leading-6 color-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleChangePasswordClick}>Change Password</button>
      </>
  </div>
</div>

    )
}

export default PasswordChange;