import {
  Text,
  View,
  Pressable,
  Keyboard,
  Platform,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { formStyles } from "../style";
import TextInput from "../components/customTextInput";
import { KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import validator from "validator";
import Constants from "expo-constants";

const IP = Constants.expoConfig.extra.IP;

export default function UserRegistration() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function registerUser() {
    try {
      const res = await fetch(`http://${IP}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (res.ok) {
        return true;
      } else if (res.status === 409) {
        Alert.alert("Registration failed", "Email is already registered", [
          { text: "OK" },
        ]);
        return false;
      }
    } catch (error) {
      Alert.alert("Problem connecting to server", "Please try again", [
        { text: "OK" },
      ]);
      console.error(error.message);
    }
  }

  const formHandler = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Incomplete Form", "Please fill in all the details", [
        { text: "OK" },
      ]);
      return;
    }

    if (!validator.isEmail(email)) {
      Alert.alert("Invalid email", "Please enter a valid email address", [
        { text: "OK" },
      ]);
      return;
    }

    if (password.length < 8) {
      Alert.alert("Wrong password", "Password must be more than 8 characters", [
        { text: "OK" },
      ]);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match", "Re-enter", [{ text: "OK" }]);
      return;
    }

    const success = await registerUser();
    if (success) {
      Alert.alert("Thanks for joining us", "Kindly login", [
        { text: "Go to login" },
      ]);
      router.push("/loginScreen");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={formStyles.container}>
            <Text style={formStyles.header}>Let's get you registered</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter your first name"
            />
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter your Last name"
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
            />
            <TextInput
              value={password}
              onChangeText={setPass}
              placeholder="Enter your password"
              secureTextEntry
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry
            />
            <Pressable onPress={formHandler} style={formStyles.button}>
              <Text>Sign-Up</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
