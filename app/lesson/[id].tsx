import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { modules } from '../../data/lessons';
import Quiz from '../../components/Quiz';
import { useTheme } from '@/contexts/ThemeContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LessonScreen() {
    const { id } = useLocalSearchParams();
    const lessonId = Array.isArray(id) ? id[0] : id;
    const { colors } = useTheme();
    const { markLessonComplete, isLessonComplete } = useProgress();

    const completed = isLessonComplete(lessonId || '');

    // Find the lesson across all modules
    let lesson = null;
    for (const module of modules) {
        const found = module.lessons.find(l => l.id === lessonId);
        if (found) {
            lesson = found;
            break;
        }
    }

    if (!lesson) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <Ionicons name="alert-circle" size={48} color="#ef4444" />
                <Text style={{ fontSize: 18, color: '#ef4444', marginTop: 12 }}>Lesson not found</Text>
            </View>
        );
    }

    const handleComplete = () => {
        markLessonComplete(lessonId || '');
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Screen
                options={{
                    title: lesson.title,
                    headerStyle: { backgroundColor: colors.cardBackground },
                    headerTintColor: colors.text,
                }}
            />

            <ScrollView style={{ flex: 1, padding: 20 }}>
                {/* Completion Badge */}
                {completed && (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#10b98120',
                        padding: 12,
                        borderRadius: 12,
                        marginBottom: 20,
                    }}>
                        <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                        <Text style={{ color: '#10b981', fontWeight: '600', marginLeft: 8 }}>
                            Lesson Completed! ✓
                        </Text>
                    </View>
                )}

                {/* Lesson Content */}
                <View style={{ marginBottom: 32 }}>
                    {lesson.content.map((block, index) => (
                        <View key={index} style={{ marginBottom: 20 }}>
                            {block.type === 'text' ? (
                                <Text style={{
                                    fontSize: 17,
                                    color: colors.text,
                                    lineHeight: 28,
                                }}>
                                    {block.content}
                                </Text>
                            ) : (
                                <View style={{
                                    backgroundColor: '#1e1e2e',
                                    padding: 16,
                                    borderRadius: 12,
                                    borderLeftWidth: 4,
                                    borderLeftColor: '#a855f7',
                                }}>
                                    <Text style={{
                                        color: '#a5f3fc',
                                        fontFamily: 'monospace',
                                        fontSize: 14,
                                        lineHeight: 22,
                                    }}>
                                        {block.content}
                                    </Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                {/* Quiz Section */}
                {lesson.quiz && lesson.quiz.length > 0 && (
                    <View style={{ marginBottom: 24 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                            <Ionicons name="help-circle" size={24} color={colors.accent} />
                            <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text, marginLeft: 8 }}>
                                Quiz Time! 🎯
                            </Text>
                        </View>
                        <Quiz questions={lesson.quiz} />
                    </View>
                )}

                {/* Mark Complete Button */}
                {!completed && (
                    <TouchableOpacity onPress={handleComplete} style={{ marginBottom: 20 }}>
                        <LinearGradient
                            colors={['#10b981', '#059669']}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 16,
                                borderRadius: 12,
                            }}
                        >
                            <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
                            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16, marginLeft: 8 }}>
                                Mark as Complete
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )}

                {/* Bottom spacing */}
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}
