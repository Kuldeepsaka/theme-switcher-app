import React, { createContext, useState } from "react";

interface ContextProps {
    darkTheme: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
    darkTheme: true,
    toggleTheme: () => { },
});

interface Props {
    children?: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(true);

    const toggleThemeHandler = () => {
        setDarkTheme((prevState) => !prevState);
    };

    return (
        <ThemeContext.Provider
            value={{
                darkTheme: darkTheme,
                toggleTheme: toggleThemeHandler,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;