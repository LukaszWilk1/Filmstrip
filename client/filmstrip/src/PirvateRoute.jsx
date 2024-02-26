import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './auth';

const PrivateRoute = () => {

    const auth = useAuth();
    console.log("PrivateRoute Auth: ", auth.user);

    return (
       auth.user ? <Outlet/> : <Navigate to="/login"/>
    );
}

export default PrivateRoute;