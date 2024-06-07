import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const ReviewScreen = () => {
  const [rating, setRating] = useState(4);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Leave your review</Text>
      </View>
      <View style={styles.content}>
        <Image
          source={require("../assets/images/persona.jpg")} // Replace with your image URL
          style={styles.image}
        />
        <Text style={styles.prompt}>How was your rider</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <FontAwesome
                name={star <= rating ? "star" : "star-o"}
                size={32}
                color="orange"
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.reviewLaterButton}>
          <Text style={styles.reviewLaterText}>Review later</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
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
