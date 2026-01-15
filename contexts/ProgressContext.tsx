import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProgressContextType {
    completedLessons: string[];
    markLessonComplete: (lessonId: string) => void;
    isLessonComplete: (lessonId: string) => boolean;
    getProgress: () => { completed: number; total: number };
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = '@js_essentials_progress';
const TOTAL_LESSONS = 5; // intro, variables, functions, arrays, objects

export function ProgressProvider({ children }: { children: ReactNode }) {
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);

    // Load progress on mount
    useEffect(() => {
        loadProgress();
    }, []);

    const loadProgress = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) {
                setCompletedLessons(JSON.parse(stored));
            }
        } catch (error) {
            console.log('Error loading progress:', error);
        }
    };

    const saveProgress = async (lessons: string[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lessons));
        } catch (error) {
            console.log('Error saving progress:', error);
        }
    };

    const markLessonComplete = (lessonId: string) => {
        if (!completedLessons.includes(lessonId)) {
            const updated = [...completedLessons, lessonId];
            setCompletedLessons(updated);
            saveProgress(updated);
        }
    };

    const isLessonComplete = (lessonId: string) => {
        return completedLessons.includes(lessonId);
    };

    const getProgress = () => ({
        completed: completedLessons.length,
        total: TOTAL_LESSONS,
    });

    return (
        <ProgressContext.Provider value={{ completedLessons, markLessonComplete, isLessonComplete, getProgress }}>
            {children}
        </ProgressContext.Provider>
    );
}

export function useProgress() {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
}
