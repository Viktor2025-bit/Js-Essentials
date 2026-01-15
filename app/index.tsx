import { View, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Link, Stack } from 'expo-router';
import { modules } from '../data/lessons';
import { useTheme } from '@/contexts/ThemeContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Lesson icons mapping
const lessonIcons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
    intro: 'rocket',
    variables: 'cube',
    functions: 'code-slash',
    arrays: 'list',
    objects: 'shapes',
};

export default function HomeScreen() {
    const { theme, toggleTheme, colors } = useTheme();
    const { isLessonComplete, getProgress } = useProgress();
    const progress = getProgress();
    const progressPercent = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

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
                                                    index === 0 ? ['#f472b6', '#ec4899'] :
                                                        index === 1 ? ['#60a5fa', '#3b82f6'] :
                                                            index === 2 ? ['#34d399', '#10b981'] :
                                                                index === 3 ? ['#fbbf24', '#f59e0b'] :
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
