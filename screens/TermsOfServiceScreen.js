import React from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const TermsOfServiceScreen = ({}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.paragraph}>
          Welcome to [App Name]! By using our app, you agree to comply with and
          be bound by the following terms of service.
        </Text>
        <Text style={styles.paragraph}>Effective Date: January 1, 2024</Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing or using the app, you agree to be bound by these terms.
          If you do not agree, please do not use the app.
        </Text>

        <Text style={styles.sectionTitle}>2. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We may update these terms from time to time. We will notify you of any
          changes by posting the new terms on this page.
        </Text>

        <Text style={styles.sectionTitle}>3. User Conduct</Text>
        <Text style={styles.paragraph}>
          You agree to use the app only for lawful purposes and in accordance
          with these terms.
        </Text>

        <Text style={styles.sectionTitle}>4. Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Our privacy policy explains how we collect, use, and protect your
          personal information. By using the app, you agree to the terms of our
          privacy policy.
        </Text>

        <Text style={styles.sectionTitle}>5. Contact Information</Text>
        <Text style={styles.paragraph}>
          If you have any questions about these Terms, please contact us at
          support@example.com.
        </Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="I Accept" onPress={() => navigation.navigate("Home")} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default TermsOfServiceScreen;
