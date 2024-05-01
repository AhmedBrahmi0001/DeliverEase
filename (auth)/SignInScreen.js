import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { TextInput, Button, Checkbox } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = () => {
    setLoading(true);
    setError("");

    // Simulate sign-in process (replace with actual logic)
    setTimeout(() => {
      if (emailOrUsername && password) {
        // Successful sign-in
        console.log("Sign in successful!");
      } else {
        // Failed sign-in
        setError("Invalid email/username or password.");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/welcome.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Sign In</Text>
          <View style={styles.inputContainer}>
            <TextInput
              label="Email or Username"
              value={emailOrUsername}
              onChangeText={(text) => setEmailOrUsername(text)}
              mode="outlined"
              left={<FontAwesome name="user" size={24} color="black" />}
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
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={rememberMe ? "checked" : "unchecked"}
                onPress={() => setRememberMe(!rememberMe)}
                color="#007bff"
              />
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>
            <TouchableOpacity
              onPress={() => console.log("Forgot password pressed")}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button
            mode="contained"
            onPress={handleSignIn}
            style={styles.signInButton}
            labelStyle={styles.signInButtonText}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              "Sign In"
            )}
          </Button>
          <Text style={styles.orText}>OR</Text>
          <View style={styles.socialMediaContainer}>
            <Button
              mode="outlined"
              onPress={() => console.log("Sign up with Google")}
              style={styles.socialMediaButton}
              labelStyle={styles.socialMediaButtonText}
              icon={({ size, color }) => (
                <FontAwesome name="google" size={size} color={color} />
              )}
            >
              Sign up with Google
            </Button>
            <Button
              mode="outlined"
              onPress={() => console.log("Sign up with Facebook")}
              style={styles.socialMediaButton}
              labelStyle={styles.socialMediaButtonText}
              icon={({ size, color }) => (
                <FontAwesome name="facebook" size={size} color={color} />
              )}
            >
              Sign up with Facebook
            </Button>
            <Button
              mode="outlined"
              onPress={() => console.log("Sign up with Twitter")}
              style={styles.socialMediaButton}
              labelStyle={styles.socialMediaButtonText}
              icon={({ size, color }) => (
                <FontAwesome name="twitter" size={size} color={color} />
              )}
            >
              Sign up with Twitter
            </Button>
          </View>
          <Text
            style={styles.signUpText}
            onPress={() => console.log("Sign up pressed")}
          >
            Don't have an account? Sign up
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  container: {
    marginTop: 30,
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMeText: {
    marginLeft: 8,
  },
  forgotPassword: {
    color: "#007bff",
    textAlign: "right",
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  signInButton: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#007bff",
    marginBottom: 10,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  orText: {
    fontSize: 16,
    marginBottom: 10,
  },
  socialMediaContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  socialMediaButton: {
    marginVertical: 5,
    width: "80%",
    borderColor: "#007bff",
    borderWidth: 1,
  },
  socialMediaButtonText: {
    color: "#007bff",
  },
  signUpText: {
    fontSize: 16,
    color: "#007bff",
  },
});
