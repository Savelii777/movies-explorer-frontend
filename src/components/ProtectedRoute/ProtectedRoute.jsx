import React from 'react';
import { Navigate } from "react-router-dom";
import { AppRoute } from '../../utils/constants';

const ProtectedRouteElement = ({ component: Component, ...props  }) => {
  return (
    props.isLoggedIn ? <Component {...props} /> : <Navigate to={AppRoute.Main} />
)}

export default ProtectedRouteElement;
