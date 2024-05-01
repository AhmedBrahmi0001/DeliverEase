/*import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const OtpSuccess = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleNavigateToHome = () => {
    navigation.navigate("/(auth)/sign-in");
  };

  const handleNavigateToBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ paddingTop: insets.top, flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <IconButton
          icon="arrow-left"
          color="black"
          size={30}
          onPress={handleNavigateToBack}
          style={styles.backButton}
        />
        <Image
          source={require("../assets/images/welcome.png")}
          style={styles.logo}
        />
        <View style={styles.content}>
          <Text style={styles.subTitle}>Phone Number Verified</Text>
          <Text style={styles.description}>
            Congratulations, your phone number has been verified. You can now
            start using the app.
          </Text>
          <Button
            mode="contained"
            onPress={handleNavigateToHome}
            style={styles.continueButton}
            labelStyle={styles.continueButtonText}
          >
            Continue
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  content: {
    alignItems: "center",
  },
  subTitle: {
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  continueButton: {
    borderRadius: 8,
    backgroundColor: "white",
    width: "100%",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default OtpSuccess;*/
