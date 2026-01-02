import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// 1️⃣ Create context
const AuthContext = createContext(null);

// 2️⃣ Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);      // logged-in user
    const [loading, setLoading] = useState(true); // auth check in progress

    // 3️⃣ Run once when app loads
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("/api/auth/me", {
                    withCredentials: true,
                });
                setUser(res.data.user); // user or null
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // 4️⃣ Login function
    const login = async (data) => {
        const res = await axios.post("/api/auth/login", data, {
            withCredentials: true,
        });
        setUser(res.data.user);
    };

    // 5️⃣ Logout function
    const logout = async () => {
        await axios.post("/api/auth/logout", {}, { withCredentials: true });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);