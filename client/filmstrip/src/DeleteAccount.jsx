import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "./auth";

const DeleteAccount = () => {

    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);

    const auth = useAuth();

    const [isInputEmpty, setIsInputEmpty] = useState(true);

    const handleDeleteAccountClick = () => {

      if(password !== ''){
        setIsInputEmpty(true);
        axios.delete("https://filmstrip.onrender.com/deleteAccount", {params: {login: auth.user.login, password: password}})
        .then(response => {
            if(response.data.isPasswordCorrect){
                setIsPasswordCorrect(true);
                auth.logout();
                navigate("/");
            } else {
                setIsPasswordCorrect(false);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        setIsInputEmpty(false);
      }
    }

    const handleInputChange = e => {

      setPassword(e.target.value);

    };

    return (
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div id="register" className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg space-y-6 p-2">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
    <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight color-yellow">Enter password to delete account</h2>
    </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 color-yellow">Password</label>
        </div>
        <div className="mt-2">
        <input id="password" name="newPassword" type="password" value={password} onChange={handleInputChange} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"></input>
        </div>
      </div>

      <div>
        {isInputEmpty ? <></> : <p className="text-red-600 text-center">You must enter data into all fields!</p>}
        {isPasswordCorrect ? <></> : <p className="text-red-600 text-center">Wrond password!</p>}
      </div>

      <div>
        <button id="deleteAccountButton" type="button" className="flex w-full justify-center rounded-md bg-red-600 hover:bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 color-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleDeleteAccountClick}>DELETE ACCOUNT</button>
      </div>
  </div>
</div>

    )
}

export default DeleteAccount;