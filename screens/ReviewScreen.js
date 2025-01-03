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
import { useCreateEvaluationModel } from "../hooks/evaluation.api"; // Import the hook
import { useNavigation, useRoute } from "@react-navigation/native";

const ReviewScreen = () => {
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { driverId } = route.params || {}; // Extracting driverId with a fallback to an empty object

  const createEvaluation = useCreateEvaluationModel();

  const handleSubmitReview = async () => {
    if (!driverId) {
      Alert.alert("Error", "Driver ID is missing.");
      return;
    }

    const reviewData = {
      driver_id: driverId,
      client_id: 31,
      comment,
      rating,
    };

    try {
      await createEvaluation.mutateAsync(reviewData);
      navigation.goBack();
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
            <Text style={styles.title}>Leave your review</Text>
          </View>
          <View style={styles.content}>
            <Image
              source={require("../assets/images/persona.jpg")} // Replace with your image URL
              style={styles.image}
            />
            <Text style={styles.prompt}>How was your rider?</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <FontAwesome
                    name={star <= rating ? "star" : "star-o"}
                    size={32}
                    color="#F4D03F"
                    style={styles.star}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Write a comment..."
              value={comment}
              onChangeText={setComment}
              multiline
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.reviewLaterButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.reviewLaterText}>Review later</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleSubmitReview}
            >
              <Text style={styles.doneButtonText}>Done</Text>
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
  prompt: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 16,
  },
  stars: {
    flexDirection: "row",
    marginVertical: 16,
  },
  star: {
    marginHorizontal: 4,
  },
  input: {
    width: "100%",
    height: 100,
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
  reviewLaterButton: {
    marginVertical: 10,
  },
  reviewLaterText: {
    color: "#1e90ff",
    fontSize: 18,
  },
  doneButton: {
    backgroundColor: "black",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 60,
    marginTop: 10,
  },
  doneButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ReviewScreen;
