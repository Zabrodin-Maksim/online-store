import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, user, requiredRole }) => {
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredRole) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        const hasRole = roles.some((role) => user.roles.includes(role));
        if (!hasRole) {
            return <Navigate to="/dashboard" />;
        }
    }

    return children;
};

export default PrivateRoute;