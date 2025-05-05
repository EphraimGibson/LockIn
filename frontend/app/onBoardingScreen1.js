import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Onboarding1() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  const questions = [
    {
      question: "Are you ready to transform your productivity?",
      subtext: "Take control of your time and achieve your goals"
    },
    {
      question: "Do you want to break free from procrastination?",
      subtext: "Start taking action and build momentum"
    },
    {
      question: "Ready to make every minute count?",
      subtext: "Join others who are already achieving more"
    }
  ];

  const handleNext = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      router.push('/onBoardingScreen2');
    }
  };

  return (
    <LinearGradient
      colors={['#4A90E2', '#357ABD']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
          <Text style={styles.question}>{questions[currentQuestion].question}</Text>
          <Text style={styles.subtext}>{questions[currentQuestion].subtext}</Text>
        </Animated.View>

        <View style={styles.progressContainer}>
          {questions.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentQuestion && styles.activeDot
              ]}
            />
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {currentQuestion === questions.length - 1 ? "Let's Begin" : "Next"}
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: height * 0.15,
    paddingBottom: height * 0.1,
  },
  questionContainer: {
    alignItems: 'center',
    maxWidth: width * 0.8,
  },
  question: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 40,
  },
  subtext: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
    transform: [{ scale: 1.2 }],
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: '600',
  },
}); 