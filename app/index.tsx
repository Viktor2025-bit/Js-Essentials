import { View, Text, ScrollView, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { Link, Stack, router } from 'expo-router';
import { modules } from '../data/lessons';
import { useTheme } from '@/contexts/ThemeContext';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

// Lesson icons mapping
const lessonIcons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
    intro: 'rocket',
    variables: 'cube',
    functions: 'code-slash',
    arrays: 'list',
    objects: 'shapes',
    'control-flow': 'git-branch',
    'es6-features': 'flash',
    'async-js': 'time',
};

export default function HomeScreen() {
    const { theme, toggleTheme, colors } = useTheme();
    const { isLessonComplete, getProgress } = useProgress();
    const { signOut } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    const progress = getProgress();
    const progressPercent = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

    useEffect(() => {
        checkOnboarding();
    }, []);

    const checkOnboarding = async () => {
        try {
            const hasSeen = await AsyncStorage.getItem('hasSeenOnboarding');
            if (hasSeen !== 'true') {
                router.replace('/onboarding');
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log('Error checking onboarding:', error);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <ActivityIndicator size="large" color={colors.accent} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header with gradient */}
            <LinearGradient
                colors={['#6366f1', '#8b5cf6', '#a855f7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ paddingTop: 60, paddingBottom: 30, paddingHorizontal: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Welcome to</Text>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#fff' }}>JS Essentials ✨</Text>
                    </View>

                    {/* Theme Toggle Button */}
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <Pressable
                            onPress={toggleTheme}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                padding: 12,
                                borderRadius: 16,
                            }}
                        >
                            <Ionicons
                                name={theme === 'light' ? 'moon' : 'sunny'}
                                size={24}
                                color="#fff"
                            />
                        </Pressable>
                        <Pressable
                            onPress={signOut}
                            style={{
                                backgroundColor: 'rgba(255,50,50,0.2)',
                                padding: 12,
                                borderRadius: 16,
                            }}
                        >
                            <Ionicons
                                name="log-out-outline"
                                size={24}
                                color="#fff"
                            />
                        </Pressable>
                    </View>
                </View>

                <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', marginTop: 12 }}>
                    Master JavaScript from zero to hero 🚀
                </Text>

                {/* Progress Bar */}
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>Your Progress</Text>
                        <Text style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '700' }}>
                            {progress.completed}/{progress.total} lessons
                        </Text>
                    </View>
                    <View style={{ backgroundColor: 'rgba(255,255,255,0.3)', height: 8, borderRadius: 4 }}>
                        <View
                            style={{
                                backgroundColor: '#fff',
                                height: 8,
                                borderRadius: 4,
                                width: `${progressPercent}%`
                            }}
                        />
                    </View>
                </View>
            </LinearGradient>

            <ScrollView style={{ flex: 1, padding: 20 }}>
                {modules.map((module) => (
                    <View key={module.id} style={{ marginBottom: 24 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                            <View style={{
                                backgroundColor: colors.accent,
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                marginRight: 10
                            }} />
                            <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>
                                {module.title}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 16, marginLeft: 18 }}>
                            {module.description}
                        </Text>

                        <View style={{ gap: 12 }}>
                            {module.lessons.map((lesson, index) => {
                                const completed = isLessonComplete(lesson.id);
                                return (
                                    <Link key={lesson.id} href={`/lesson/${lesson.id}`} asChild>
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: colors.cardBackground,
                                                padding: 16,
                                                borderRadius: 16,
                                                borderWidth: completed ? 2 : 1,
                                                borderColor: completed ? '#10b981' : colors.cardBorder,
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.05,
                                                shadowRadius: 8,
                                                elevation: 2,
                                            }}
                                        >
                                            {/* Lesson Icon */}
                                            <LinearGradient
                                                colors={
                                                    index % 5 === 0 ? ['#f472b6', '#ec4899'] :
                                                        index % 5 === 1 ? ['#60a5fa', '#3b82f6'] :
                                                            index % 5 === 2 ? ['#34d399', '#10b981'] :
                                                                index % 5 === 3 ? ['#fbbf24', '#f59e0b'] :
                                                                    ['#a78bfa', '#8b5cf6']
                                                }
                                                style={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: 12,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginRight: 14,
                                                }}
                                            >
                                                <Ionicons
                                                    name={lessonIcons[lesson.id] || 'book'}
                                                    size={24}
                                                    color="#fff"
                                                />
                                            </LinearGradient>

                                            {/* Lesson Info */}
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 4 }}>
                                                    {lesson.title}
                                                </Text>
                                                <Text style={{ fontSize: 13, color: colors.textSecondary }}>
                                                    {lesson.quiz ? `${lesson.content.length} sections · ${lesson.quiz.length} quiz` : `${lesson.content.length} sections`}
                                                </Text>
                                            </View>

                                            {/* Completion Badge or Arrow */}
                                            {completed ? (
                                                <View style={{
                                                    backgroundColor: '#10b981',
                                                    width: 28,
                                                    height: 28,
                                                    borderRadius: 14,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Ionicons name="checkmark" size={18} color="#fff" />
                                                </View>
                                            ) : (
                                                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                                            )}
                                        </TouchableOpacity>
                                    </Link>
                                );
                            })}
                        </View>
                    </View>
                ))}

                {/* Bottom spacing */}
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}
