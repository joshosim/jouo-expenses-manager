import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};

const getTheme = (mode) =>
    createTheme({
        typography: {
            fontFamily: 'Sora',
        },
        palette: {
            mode,
            primary: { main: '#379E66' },
        },
        components: {
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                },
                styleOverrides: {
                    root: {
                        textTransform: 'inherit',
                        fontWeight: 700,
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '&.MuiTextField-root': {
                            backgroundColor: mode === 'dark' ? 'grey' : '#F9F9F9',
                        },
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: mode === 'dark' ? '#fff' : '#000',
                    },
                },
            },
        },
    });

export const CustomThemeProvider = ({ children }) => {
    const storedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

    // Initialize the theme from localStorage or system preference
    const [mode, setMode] = useState(storedTheme || systemPreference);

    const toggleTheme = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('theme', newMode); // Save to localStorage
    };

    const applySystemSettings = () => {
        const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
        setMode(systemMode);
        localStorage.setItem('theme', systemMode);
    };

    useEffect(() => {
        // Update theme mode based on system preference changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            const systemMode = mediaQuery.matches ? 'dark' : 'light';
            if (!localStorage.getItem('theme')) {
                setMode(systemMode);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const theme = getTheme(mode);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme, applySystemSettings }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};