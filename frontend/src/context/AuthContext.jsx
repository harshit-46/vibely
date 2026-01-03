import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/auth/me");
                setUser(res.data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (data) => {
        const res = await axios.post("/auth/login", data);
        setUser(res.data.user);
        navigate("/feed", { replace: true });
    };

    const signup = async (data) => {
        const res = await axios.post("/auth/register", data);
        setUser(res.data.user);
        navigate("/feed", { replace: true });
    };

    const logout = async () => {
        await axios.post("/auth/logout");
        setUser(null);
        navigate("/", { replace: true });
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};