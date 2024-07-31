import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext"; // Adjust the path based on your project structure
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth(); // Destructure register function from AuthContext

  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    // Validation
    if (!username || !email || !password || !phoneNumber) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await register(
        username,
        email,
        password,
        phoneNumber
      );
      if (error) {
        console.log("error", error);
        setError(error);
      } else {
        navigation.navigate("Home");
        console.log("User registered successfully:", data);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>
          {/* {error ? <Text style={styles.error}>{error}</Text> : null} */}
          <View style={styles.inputContainer}>
            <TextInput
              label="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              mode="outlined"
              left={<FontAwesome name="user" size={24} color="black" />}
              style={styles.input}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              mode="outlined"
              left={<FontAwesome name="envelope" size={24} color="black" />}
              style={styles.input}
            />
            {error?.errors?.email ? <Text style={styles.error}>{error?.errors?.email}</Text> : null}
            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              mode="outlined"
              secureTextEntry
              left={<FontAwesome name="lock" size={24} color="black" />}
              style={styles.input}
            />
            <TextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              mode="outlined"
              left={<FontAwesome name="phone" size={24} color="black" />}
              style={styles.input}
            />
          </View>
          <Button
            mode="contained"
            onPress={handleSignUp}
            style={styles.signUpButton}
            labelStyle={styles.signUpButtonText}
            loading={loading}
          >
            Sign Up
          </Button>
          {/* Social Media Sign-Up Options */}
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
              Sign Up with Google
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
              Sign Up with Facebook
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
              Sign Up with Twitter
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  socialMediaContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
});
