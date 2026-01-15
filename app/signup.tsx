import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Stack, Link } from 'expo-router';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignupScreen() {
    const { colors } = useTheme();
    const { signUp } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async () => {
        if (!name || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setError('');
        setIsLoading(true);
        try {
            await signUp(email, password, name);
        } catch (err) {
            setError('Failed to create account. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: colors.background }}
        >
            <Stack.Screen options={{ headerShown: false }} />

            <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
                {/* Header */}
                <View style={{ alignItems: 'center', marginBottom: 40 }}>
                    <LinearGradient
                        colors={['#10b981', '#34d399']}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 16,
                        }}
                    >
                        <Ionicons name="person-add" size={40} color="#fff" />
                    </LinearGradient>
                    <Text style={{ fontSize: 32, fontWeight: 'bold', color: colors.text }}>Create Account</Text>
                    <Text style={{ fontSize: 16, color: colors.textSecondary, marginTop: 8 }}>Join us and start learning!</Text>
                </View>

                {/* Form */}
                <View style={{ gap: 16 }}>
                    {error ? <Text style={{ color: '#ef4444', textAlign: 'center' }}>{error}</Text> : null}

                    <View>
                        <Text style={{ color: colors.text, marginBottom: 8, fontWeight: '600' }}>Name</Text>
                        <TextInput
                            style={{
                                backgroundColor: colors.cardBackground,
                                padding: 16,
                                borderRadius: 12,
                                color: colors.text,
                                borderWidth: 1,
                                borderColor: colors.cardBorder,
                            }}
                            placeholder="John Doe"
                            placeholderTextColor={colors.textSecondary}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View>
                        <Text style={{ color: colors.text, marginBottom: 8, fontWeight: '600' }}>Email</Text>
                        <TextInput
                            style={{
                                backgroundColor: colors.cardBackground,
                                padding: 16,
                                borderRadius: 12,
                                color: colors.text,
                                borderWidth: 1,
                                borderColor: colors.cardBorder,
                            }}
                            placeholder="hello@example.com"
                            placeholderTextColor={colors.textSecondary}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <View>
                        <Text style={{ color: colors.text, marginBottom: 8, fontWeight: '600' }}>Password</Text>
                        <TextInput
                            style={{
                                backgroundColor: colors.cardBackground,
                                padding: 16,
                                borderRadius: 12,
                                color: colors.text,
                                borderWidth: 1,
                                borderColor: colors.cardBorder,
                            }}
                            placeholder="••••••••"
                            placeholderTextColor={colors.textSecondary}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleSignup}
                        disabled={isLoading}
                        style={{
                            marginTop: 8,
                            shadowColor: '#10b981',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 8,
                            elevation: 4,
                        }}
                    >
                        <LinearGradient
                            colors={['#10b981', '#34d399']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                padding: 16,
                                borderRadius: 12,
                                alignItems: 'center',
                            }}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sign Up</Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
                    <Text style={{ color: colors.textSecondary }}>Already have an account? </Text>
                    <Link href="/login" asChild>
                        <TouchableOpacity>
                            <Text style={{ color: '#10b981', fontWeight: 'bold' }}>Login</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
