import React from "react";
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

export default function OrderScreen() {
  const handleSignOut = () => {
    // Handle sign out logic here
  };

  const CustomSettingCard = ({ title, subtitle, icon, href }) => (
    <TouchableOpacity onPress={() => console.log(href)}>
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
              title="Account"
              subtitle="Manage your account"
              icon="user"
              href="/profile"
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
              href="/notification"
            />
            <CustomSettingCard
              title="Privacy Policy"
              subtitle="View Privacy Policy"
              icon="lock"
              href="/privacy-policy"
            />
            <CustomSettingCard
              title="Terms of Service"
              subtitle="View Terms of Service"
              icon="file-text"
              href="/terms-of-service"
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
