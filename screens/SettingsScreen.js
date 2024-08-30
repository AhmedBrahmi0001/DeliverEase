import React, { useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext"; // Adjust the path based on your project structure
import { useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OrderScreen() {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const queryClient = useQueryClient(); // Get the query client instance
  const clearLocalStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Local storage cleared");
    } catch (error) {
      console.error("Error clearing local storage:", error);
    }
  };
  const handleSignOut = async () => {
    try {
      await logout(); // Call signOut function from context or authentication service
      clearLocalStorage(); // Clear AsyncStorage
      queryClient.clear(); // Reset React Query cache
      navigation.navigate("SignIn"); // Navigate to the login screen or some other appropriate screen
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const CustomSettingCard = ({ title, subtitle, icon, href }) => (
    <TouchableOpacity onPress={() => navigation.navigate(href)}>
      <Card.Title
        title={title}
        subtitle={subtitle}
        left={() => <FontAwesome name={icon} size={24} color="#007bff" />}
        style={styles.settingItem}
        titleStyle={styles.settingTitle}
        subtitleStyle={styles.settingSubtitle}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <CustomSettingCard
              onPress={() => navigation.navigate("Profile")}
              title="Account"
              subtitle="Manage your account"
              icon="user"
              href="Profile"
            />
            <CustomSettingCard
              title="Phone number"
              subtitle="Edit Phone number"
              icon="phone"
              href="/notifications"
            />
            <CustomSettingCard
              title="Notifications"
              subtitle="Manage notifications"
              icon="bell"
              href="Notification"
            />
            <CustomSettingCard
              title="Privacy Policy"
              subtitle="View Privacy Policy"
              icon="lock"
              href="privacy"
            />
            <CustomSettingCard
              title="Terms of Service"
              subtitle="View Terms of Service"
              icon="file-text"
              href="terms"
            />
          </View>
          <TouchableOpacity
            style={[styles.button, styles.signOutButton]}
            onPress={handleSignOut}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  settingItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  settingSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 5,
  },
  signOutButton: {
    backgroundColor: "#007bff",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
