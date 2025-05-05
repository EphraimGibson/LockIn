import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Dimensions, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import validator from 'validator';

const { width, height } = Dimensions.get('window');

export default function Onboarding2() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const splitName = (fullName) => {
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    return { firstName, lastName };
  };

  const registerUser = async (firstName, lastName, email, password) => {
    try {
      const res = await fetch("http://192.168.1.237:3000/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (res.ok) {
        return true;
      } else if (res.status === 409) {
        Alert.alert(
          "Registration failed",
          "Email is already registered",
          [{ text: "OK" }]
        );
        return false;
      }
    } catch (error) {
      Alert.alert(
        "Problem connecting to server",
        "Please try again",
        [{ text: "OK" }]
      );
      console.error(error.message);
      return false;
    }
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      if (!name.trim()) {
        Alert.alert("Name Required", "Please enter your full name");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!email.trim() || !password) {
        Alert.alert("Incomplete Form", "Please fill in all the details");
        return;
      }

      if (!validator.isEmail(email)) {
        Alert.alert("Invalid email", "Please enter a valid email address");
        return;
      }

      if (password.length < 8) {
        Alert.alert("Password too short", "Password must be at least 8 characters");
        return;
      }

      const { firstName, lastName } = splitName(name);
      const success = await registerUser(firstName, lastName, email, password);
      
      if (success) {
        Alert.alert(
          "Thanks for joining us",
          "Kindly login",
          [{ text: "Sign-in" }]
        );
        router.push("/loginScreen");
      }
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>What's your name?</Text>
      <Text style={styles.subtitle}>Let's personalize your experience</Text>
      
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} color="#4A90E2" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.subtitle}>Secure your journey to productivity</Text>
      
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="#4A90E2" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#4A90E2" style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Create a password (min. 8 characters)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#999"
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#4A90E2"
          />
        </Pressable>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#4A90E2', '#357ABD']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {currentStep === 1 ? renderStep1() : renderStep2()}

          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                (!name.trim() || (currentStep === 2 && (!email.trim() || password.length < 8))) && styles.buttonDisabled,
                pressed && styles.buttonPressed
              ]}
              onPress={handleNext}
              disabled={!name.trim() || (currentStep === 2 && (!email.trim() || password.length < 8))}
            >
              <Text style={styles.buttonText}>
                {currentStep === 1 ? "Next" : "Create Account"}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: height * 0.15,
    paddingBottom: height * 0.1,
  },
  stepContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: '100%',
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  buttonContainer: {
    alignItems: 'center',
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
  buttonDisabled: {
    opacity: 0.5,
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