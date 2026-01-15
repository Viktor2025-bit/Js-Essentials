import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { QuizQuestion } from '../data/lessons';

interface QuizProps {
    questions: QuizQuestion[];
}

export default function Quiz({ questions }: QuizProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const question = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleOptionSelect = (index: number) => {
        if (showResult) return;
        setSelectedOption(index);
    };

    const handleSubmit = () => {
        if (selectedOption === null) return;

        if (selectedOption === question.correctAnswer) {
            setScore(score + 1);
        }
        setShowResult(true);
    };

    const handleNext = () => {
        setSelectedOption(null);
        setShowResult(false);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    if (currentQuestionIndex >= questions.length) {
        // Should not happen if logic is correct, but handled in render
        return null;
    }

    return (
        <View className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <Text className="text-sm text-gray-500 mb-2">Question {currentQuestionIndex + 1} of {questions.length}</Text>
            <Text className="text-lg font-semibold mb-4">{question.question}</Text>

            <View className="space-y-3 mb-6">
                {question.options.map((option, index) => {
                    let bgColor = 'bg-white';
                    let borderColor = 'border-gray-200';

                    if (showResult) {
                        if (index === question.correctAnswer) {
                            bgColor = 'bg-green-100';
                            borderColor = 'border-green-500';
                        } else if (index === selectedOption) {
                            bgColor = 'bg-red-100';
                            borderColor = 'border-red-500';
                        }
                    } else if (selectedOption === index) {
                        bgColor = 'bg-indigo-50';
                        borderColor = 'border-indigo-500';
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleOptionSelect(index)}
                            disabled={showResult}
                            className={`p-4 rounded-lg border ${bgColor} ${borderColor}`}
                        >
                            <Text className="text-base text-gray-800">{option}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {!showResult ? (
                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={selectedOption === null}
                    className={`p-4 rounded-lg items-center ${selectedOption === null ? 'bg-gray-300' : 'bg-indigo-600'}`}
                >
                    <Text className="text-white font-bold text-lg">Submit Answer</Text>
                </TouchableOpacity>
            ) : (
                <View>
                    <View className="mb-4">
                        <Text className={selectedOption === question.correctAnswer ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                            {selectedOption === question.correctAnswer ? "Correct!" : "Incorrect"}
                        </Text>
                    </View>

                    {!isLastQuestion ? (
                        <TouchableOpacity
                            onPress={handleNext}
                            className="bg-indigo-600 p-4 rounded-lg items-center"
                        >
                            <Text className="text-white font-bold text-lg">Next Question</Text>
                        </TouchableOpacity>
                    ) : (
                        <View className="bg-indigo-50 p-4 rounded-lg items-center">
                            <Text className="text-indigo-800 font-bold text-lg">Quiz Completed!</Text>
                            <Text className="text-indigo-600">Score: {score + (selectedOption === question.correctAnswer ? 1 : 0)} / {questions.length}</Text>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}
