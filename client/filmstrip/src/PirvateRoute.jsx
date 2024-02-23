import { Navigate, Outlet } from 'react-router-dom'
import Login from './Login';

const PrivateRoute = () => {

    let auth = {'token': false};

    return (
       auth.token ? <Outlet/> : <Navigate to="/login"/>
    );
}

export default PrivateRoute;