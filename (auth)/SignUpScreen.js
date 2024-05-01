import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {
    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Additional logic to sign up the user
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            left={<FontAwesome name="envelope" size={24} color="black" />}
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            mode="outlined"
            secureTextEntry
            left={<FontAwesome name="lock" size={24} color="black" />}
            style={styles.input}
          />
        </View>
        <Button
          mode="contained"
          onPress={handleSignUp}
          style={styles.signUpButton}
          labelStyle={styles.signUpButtonText}
        >
          Sign Up
        </Button>
        <Text style={styles.orText}>OR</Text>
        <Button
          mode="outlined"
          onPress={() => console.log("Sign up with Google")}
          style={styles.googleButton}
          labelStyle={styles.googleButtonText}
        >
          Sign Up with Google
        </Button>
        <TouchableOpacity onPress={() => Linking.openURL("/login")}>
          <Text style={styles.link}>Already have an account? Log in here.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 20,
  },
  signUpButton: {
    borderRadius: 8,
    backgroundColor: "#007bff",
    marginBottom: 10,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  orText: {
    textAlign: "center",
    marginBottom: 10,
  },
  googleButton: {
    borderColor: "#007bff",
    borderWidth: 1,
    marginBottom: 10,
  },
  googleButtonText: {
    color: "#007bff",
  },
  link: {
    textAlign: "center",
    color: "#007bff",
    textDecorationLine: "underline",
  },
});
