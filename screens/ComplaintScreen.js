import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useCreateComplaintModel } from "../hooks/complaint.api"; // Import the hook
import { useNavigation } from "@react-navigation/native";

const ComplaintScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const createComplaint = useCreateComplaintModel();

  const handleSubmitComplaint = async () => {
    if (!title || !description) {
      Alert.alert("Error", "Title and Description are required.");
      return;
    }

    const complaintData = {
      title,
      description,
      etat: "pending",
    };

    // createComplaint(complaintData, {
    //   onSuccess: (data) => {
    //     console.log("Complaint successful:", data);
    //     navigation.goBack();
    //   },
    //   onError: (error) => {
    //     console.error("ErrorSubmitting complaint:", error);
    //   },
    // });
    try {
      await createComplaint.mutateAsync(complaintData);
      navigation.navigate("Home");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorsObject = error.response.data;
        console.error("errorsObject: ", errorsObject);
      } else {
        console.error("Error occurred without response data:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={100} // Adjust this value if necessary
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Leave your Complaint</Text>
          </View>
          <View style={styles.content}>
            <Image
              source={require("../assets/images/persona.jpg")} // Replace with your image URL
              style={styles.image}
            />
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitComplaint}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  title: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 16,
  },
  content: {
    flex: 1,
    alignItems: "center",
    marginTop: 32,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    marginTop: 20,
  },
  footer: {
    alignItems: "center",
    marginBottom: 32,
  },
  submitButton: {
    backgroundColor: "black",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 60,
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ComplaintScreen;
