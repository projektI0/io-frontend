import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../auth/AuthService';

const ProtectedRoute = ({ children } : {children: ReactElement}) => {
    const user = getCurrentUser();

    if (!user || !user.roles.includes("USER")) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;