import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [displayName, setDisplayName] = useState("John Doe");
  const [email, setEmail] = useState("user@example.com");
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");
  const [bio, setBio] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );
  const [profilePicture, setProfilePicture] = useState(
    require("../assets/images/welcome.png")
  );

  const handleSave = () => {
    console.log("Display Name:", displayName);
    console.log("Email:", email);
    console.log("Phone Number:", phoneNumber);
    console.log("Bio:", bio);
    // Additional logic to save profile changes
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.title}>User Profile</Text>
        <View style={styles.profileContainer}>
          <Image source={profilePicture} style={styles.profilePicture} />
          <TextInput
            label="Display Name"
            value={displayName}
            onChangeText={(text) => setDisplayName(text)}
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
          <TextInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            mode="outlined"
            left={<FontAwesome name="phone" size={24} color="black" />}
            style={styles.input}
          />
          <TextInput
            label="Bio"
            value={bio}
            onChangeText={(text) => setBio(text)}
            mode="outlined"
            multiline
            numberOfLines={3}
            left={<FontAwesome name="info-circle" size={24} color="black" />}
            style={[styles.input, { height: 100 }]}
          />
        </View>
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
          labelStyle={styles.saveButtonText}
        >
          Save
        </Button>
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
});
