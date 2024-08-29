import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem("token");
    return token ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
