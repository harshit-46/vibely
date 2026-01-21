import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./useAuth";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.theme) return;

        document.documentElement.classList.toggle(
            "dark",
            user.theme === "dark"
        );
    }, [user?.theme]);

    return (
        <ThemeContext.Provider value={{ theme: user?.theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);