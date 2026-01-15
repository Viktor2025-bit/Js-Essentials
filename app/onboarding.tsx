import { View, Text, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { router, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';

const { width } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        title: 'Welcome to\nJS Essentials',
        description: 'Your pocket companion for mastering JavaScript from scratch.',
        icon: 'rocket',
        color: ['#6366f1', '#8b5cf6'],
    },
    {
        id: '2',
        title: 'Interactive\nLearning',
        description: 'Learn concepts through bite-sized lessons and interactive quizzes.',
        icon: 'school',
        color: ['#3b82f6', '#06b6d4'],
    },
    {
        id: '3',
        title: 'Track Your\nProgress',
        description: 'Watch your skills grow as you complete modules and earn badges.',
        icon: 'trophy',
        color: ['#10b981', '#34d399'],
    },
];

export default function OnboardingScreen() {
    const { colors, theme } = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleScroll = (event: any) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveIndex(slideIndex);
    };

    const completeOnboarding = async () => {
        try {
            await AsyncStorage.setItem('hasSeenOnboarding', 'true');
            router.replace('/login');
        } catch (error) {
            console.log('Error saving onboarding status:', error);
            router.replace('/login');
        }
    };

    const handleNext = () => {
        if (activeIndex < slides.length - 1) {
            scrollViewRef.current?.scrollTo({ x: width * (activeIndex + 1), animated: true });
        } else {
            completeOnboarding();
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={{ flex: 1 }}
            >
                {slides.map((slide, index) => (
                    <View key={slide.id} style={{ width, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                        {/* Icon Circle */}
                        <LinearGradient
                            colors={slide.color as [string, string]}
                            style={{
                                width: 200,
                                height: 200,
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 60,
                                shadowColor: slide.color[0],
                                shadowOffset: { width: 0, height: 10 },
                                shadowOpacity: 0.3,
                                shadowRadius: 20,
                                elevation: 10,
                            }}
                        >
                            <Ionicons name={slide.icon as any} size={80} color="#fff" />
                        </LinearGradient>

                        <Text style={{
                            fontSize: 32,
                            fontWeight: '800',
                            color: colors.text,
                            textAlign: 'center',
                            marginBottom: 16,
                            lineHeight: 40,
                        }}>
                            {slide.title}
                        </Text>

                        <Text style={{
                            fontSize: 18,
                            color: colors.textSecondary,
                            textAlign: 'center',
                            lineHeight: 24,
                            paddingHorizontal: 10
                        }}>
                            {slide.description}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            {/* Footer */}
            <View style={{ padding: 40, paddingTop: 20 }}>
                {/* Pagination Dots */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 40 }}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={{
                                width: index === activeIndex ? 24 : 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: index === activeIndex ? colors.accent : (theme === 'dark' ? '#334155' : '#e2e8f0'),
                                marginHorizontal: 4,
                            }}
                        />
                    ))}
                </View>

                {/* Button */}
                <TouchableOpacity
                    onPress={handleNext}
                    style={{
                        width: '100%',
                        shadowColor: colors.accent,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 8,
                        elevation: 4,
                    }}
                >
                    <LinearGradient
                        colors={['#6366f1', '#8b5cf6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            paddingVertical: 16,
                            borderRadius: 16,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                            {activeIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Skip button logic could act here too */}
                {activeIndex < slides.length - 1 && (
                    <TouchableOpacity
                        onPress={completeOnboarding}
                        style={{
                            marginTop: 20,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 10
                        }}
                    >
                        <Text style={{ color: colors.textSecondary, fontSize: 16, textAlign: 'center' }}>Skip Intro</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
