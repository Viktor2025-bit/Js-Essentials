import React, { createContext, useContext, useState, ReactNode } from 'react';
type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeMode;
    toggleTheme: () => void;
    colors: typeof lightColors;
}

const lightColors = {
    background: '#FAFBFF',
    cardBackground: '#FFFFFF',
    text: '#1a1a2e',
    textSecondary: '#6b7280',
    accent: '#6366f1',
    accentGradientStart: '#818cf8',
    accentGradientEnd: '#6366f1',
    cardBorder: '#e5e7eb',
    lessonCardBg: '#f8fafc',
    success: '#10b981',
    warning: '#f59e0b',
};

const darkColors = {
    background: '#0f172a',
    cardBackground: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    accent: '#818cf8',
    accentGradientStart: '#a5b4fc',
    accentGradientEnd: '#818cf8',
    cardBorder: '#334155',
    lessonCardBg: '#1e293b',
    success: '#34d399',
    warning: '#fbbf24',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemeMode>('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const colors = theme === 'light' ? lightColors : darkColors;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
