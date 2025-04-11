import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Indexstyles } from "@/style";

export default function Index() {
  return (
    <View style={Indexstyles.container}>
      <Text style={Indexstyles.text}>LockIn</Text>
      <Text style={{marginTop: 20}}>Welcome to LockIn, streamline your tasks effortlessly!</Text>
      <Link href="/guest" style={Indexstyles.button}>
        <Text style={Indexstyles.buttonText}>Get Started</Text>
      </Link>
      <Link href="/" style={Indexstyles.button}>
        <Text style={Indexstyles.buttonText}>      Login    </Text>
      </Link>
    </View>
  );
}

