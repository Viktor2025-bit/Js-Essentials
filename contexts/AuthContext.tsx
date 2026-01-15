import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface User {
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, name: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.log('Error checking user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        // Mock login logic for now
        setIsLoading(true);
        setTimeout(async () => {
            const mockUser = { email, name: 'Demo User' };
            setUser(mockUser);
            await AsyncStorage.setItem('user', JSON.stringify(mockUser));
            setIsLoading(false);
            router.replace('/');
        }, 1000);
    };

    const signUp = async (email: string, password: string, name: string) => {
        // Mock signup logic
        setIsLoading(true);
        setTimeout(async () => {
            const mockUser = { email, name };
            setUser(mockUser);
            await AsyncStorage.setItem('user', JSON.stringify(mockUser));
            setIsLoading(false);
            router.replace('/');
        }, 1000);
    };

    const signOut = async () => {
        setIsLoading(true);
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
            router.replace('/login');
        } catch (error) {
            console.log('Error logging out:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
