import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const OTPEntryScreen = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputBoxScale = useState(new Animated.Value(1))[0];

  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      Alert.alert("Error", "Please enter the verification code.");
      return;
    }

    setLoading(true);

    try {
      // Simulate OTP verification process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Assume verification is successful
      Alert.alert("Success", "OTP verification successful!");
      // Navigate to success screen or dashboard
    } catch (error) {
      console.error("Error during OTP entry:", error);
      Alert.alert("Error", "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    Animated.timing(inputBoxScale, {
      toValue: 0.95,
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    Animated.timing(inputBoxScale, {
      toValue: 1,
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter OTP Code</Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.inputRef.focus()}
        style={[
          styles.inputContainer,
          { transform: [{ scale: inputBoxScale }] },
          isFocused && styles.inputContainerFocused,
        ]}
      >
        <FontAwesome name="lock" size={24} color="black" style={styles.icon} />
        <TextInput
          ref={(ref) => (this.inputRef = ref)}
          style={styles.input}
          placeholder="Enter Verification Code"
          value={verificationCode}
          onChangeText={setVerificationCode}
          keyboardType="numeric"
          maxLength={6}
          editable={!loading}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </TouchableOpacity>
      <Button
        title={loading ? "Verifying..." : "Verify Code"}
        onPress={handleVerifyCode}
        disabled={loading}
        style={styles.button}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp("5%"),
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: wp("5%"),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
    height: wp("15%"),
    width: "80%",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: wp("1%"),
    marginBottom: wp("5%"),
  },
  inputContainerFocused: {
    borderColor: "#007bff",
  },
  icon: {
    marginRight: wp("2%"),
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: wp("4%"),
  },
  button: {
    marginTop: wp("5%"),
    width: "80%",
    borderRadius: wp("2%"),
  },
});

export default OTPEntryScreen;
