import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { colors, typography, spacing, borderRadius, shadows } from "../theme";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.subtitle}>
            Your personal productivity companion
          </Text>

          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.loginButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => router.push("/onBoardingScreen1")}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.registerButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => router.push("/loginScreen")}
            >
              <Text style={[styles.buttonText, styles.registerButtonText]}>
                Login
              </Text>
            </Pressable>
          </View>

          <Text style={styles.tagline}>
            Stay focused. Stay productive. Stay locked in.
          </Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    padding: spacing.xl,
    width: "100%",
  },
  logo: {
    width: width * 0.7,
    height: width * 0.6,
    marginBottom: spacing.md,
    ...shadows.lg,
  },
  title: {
    fontSize: typography.fontSize["4xl"],
    fontFamily: typography.fontFamily.bold,
    color: colors.white,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.black,
    opacity: 0.9,
    marginBottom: spacing["2xl"],
    textAlign: "center",
    
  },
  buttonContainer: {
    width: "100%",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  button: {
    width: "100%",
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.lg,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  loginButton: {
    backgroundColor: colors.white,
  },
  registerButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.white,
  },
  buttonText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
  },
  registerButtonText: {
    color: colors.white,
  },
  tagline: {
    fontSize: typography.fontSize.base,
    color: colors.white,
    opacity: 0.8,
    textAlign: "center",
    fontStyle: "italic",
  },
});
