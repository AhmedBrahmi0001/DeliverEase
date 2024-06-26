import React from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivacyPolicyScreen = ({ navigation }) => {
  const handleAccept = () => {
    // Navigate to the main app screen or another appropriate screen
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Your privacy is important to us. This privacy policy explains how we
          collect, use, and protect your personal information.
        </Text>
        <Text style={styles.paragraph}>Effective Date: January 1, 2024</Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We collect information you provide directly to us, such as when you
          create an account, fill out a form, or contact us for support.
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Information</Text>
        <Text style={styles.paragraph}>
          We use the information we collect to provide, maintain, and improve
          our services, to communicate with you, and to protect our users.
        </Text>

        <Text style={styles.sectionTitle}>3. Sharing of Information</Text>
        <Text style={styles.paragraph}>
          We do not share your personal information with third parties except as
          described in this policy or with your consent.
        </Text>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.paragraph}>
          We implement a variety of security measures to maintain the safety of
          your personal information. However, no method of transmission over the
          Internet or method of electronic storage is 100% secure.
        </Text>

        <Text style={styles.sectionTitle}>5. Your Choices</Text>
        <Text style={styles.paragraph}>
          You have choices regarding the collection, use, and sharing of your
          personal information. You may decline to provide certain information,
          but this may limit your ability to use some features of the service.
        </Text>

        <Text style={styles.sectionTitle}>6. Changes to This Policy</Text>
        <Text style={styles.paragraph}>
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new policy on this page.
        </Text>

        <Text style={styles.sectionTitle}>7. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about this privacy policy, please contact us
          at support@example.com.
        </Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="I Accept" onPress={handleAccept} />
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

export default PrivacyPolicyScreen;
