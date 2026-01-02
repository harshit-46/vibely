import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // 1️⃣ Wait until auth check finishes
    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    // 2️⃣ If not logged in → redirect to login
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // 3️⃣ If logged in → show page
    return children;
};

export default ProtectedRoute;