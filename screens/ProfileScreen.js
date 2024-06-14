import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [displayName, setDisplayName] = useState("John Doe");
  const [email, setEmail] = useState("user@example.com");
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");
  const [profilePicture, setProfilePicture] = useState(
    require("../assets/images/welcome.png")
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (newPassword && newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Profile Saved",
        "Your profile has been updated successfully."
      );
    }, 2000);
  };

  const handleProfilePictureChange = () => {
    // Logic to change profile picture
  };

  const handleLogout = () => {
    // Logic to log out user
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>User Profile</Text>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handleProfilePictureChange}>
            <Image source={profilePicture} style={styles.profilePicture} />
            <FontAwesome
              name="camera"
              size={24}
              color="black"
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
          <TextInput
            label="Display Name"
            value={displayName}
            onChangeText={(text) => setDisplayName(text)}
            mode="outlined"
            left={
              <TextInput.Icon
                name={() => <FontAwesome name="user" size={24} color="black" />}
              />
            }
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            left={
              <TextInput.Icon
                name={() => (
                  <FontAwesome name="envelope" size={24} color="black" />
                )}
              />
            }
            style={styles.input}
          />
          <TextInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            mode="outlined"
            left={
              <TextInput.Icon
                name={() => (
                  <FontAwesome name="phone" size={24} color="black" />
                )}
              />
            }
            style={styles.input}
          />
          <TextInput
            label="New Password"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            mode="outlined"
            secureTextEntry
            left={
              <TextInput.Icon
                name={() => <FontAwesome name="lock" size={24} color="black" />}
              />
            }
            style={styles.input}
          />
          <TextInput
            label="Confirm New Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            mode="outlined"
            secureTextEntry
            left={
              <TextInput.Icon
                name={() => <FontAwesome name="lock" size={24} color="black" />}
              />
            }
            style={styles.input}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
            labelStyle={styles.saveButtonText}
          >
            Save
          </Button>
        )}
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          labelStyle={styles.logoutButtonText}
        >
          Logout
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 30,
    flexGrow: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  cameraIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 5,
  },
  input: {
    width: "100%",
    marginBottom: 20,
  },
  saveButton: {
    borderRadius: 8,
    backgroundColor: "#007bff",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  logoutButton: {
    marginTop: 10,
    borderRadius: 8,
    borderColor: "#007bff",
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
});
