import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {

    const auth = {token: false};

    return (
       auth.token ? <Outlet/> : <Navigate to="/login"/>
    );
}

export default PrivateRoute;