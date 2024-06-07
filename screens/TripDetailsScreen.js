import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const TripDetailsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <FontAwesome
            name="arrow-left"
            size={24}
            color="black"
            style={styles.backIcon}
          />
          <Text style={styles.headerText}>Trip details</Text>
        </View>

        <View style={styles.userInfo}>
          <Image
            source={require("../assets/images/persona.jpg")}
            style={styles.userImage}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Alan Jhon</Text>
            <View style={styles.rating}>
              <FontAwesome name="star" size={16} color="#FFD700" />
              <FontAwesome name="star" size={16} color="#FFD700" />
              <FontAwesome name="star" size={16} color="#FFD700" />
              <FontAwesome name="star" size={16} color="#FFD700" />
              <FontAwesome name="star-half" size={16} color="#FFD700" />
            </View>
          </View>
        </View>

        <View style={styles.tripInfo}>
          <Text style={styles.carType}>Executive</Text>
          <Text style={styles.tripStatus}>Completed</Text>
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>
            3 Clive Rd, Clive Road, England, United Kingdom-DA11 0AU
          </Text>
          <Text style={styles.addressText}>
            1 Trafalgar Rd, Trafalgar Road, England, United Kingdom-DA11 0QA
          </Text>
        </View>

        <View style={styles.earningsContainer}>
          <Text style={styles.earningsTitle}>Earnings</Text>
          <Text style={styles.earningsAmount}>£1.92</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Duration</Text>
            <Text style={styles.detailValue}>1 mins</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Distance</Text>
            <Text style={styles.detailValue}>0 kms</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Time requested</Text>
            <Text style={styles.detailValue}>02:39 PM</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Date</Text>
            <Text style={styles.detailValue}>May 2, 2023</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Fare</Text>
            <Text style={styles.detailValue}>£1.02</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Service fee</Text>
            <Text style={styles.detailValue}>-£0.10</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
          <FontAwesome name="arrow-right" size={16} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userDetails: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  rating: {
    flexDirection: "row",
    marginTop: 5,
  },
  tripInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  carType: {
    fontSize: 16,
    color: "black",
  },
  tripStatus: {
    fontSize: 16,
    color: "green",
  },
  addressContainer: {
    marginBottom: 20,
  },
  addressText: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },
  earningsContainer: {
    backgroundColor: "#707B7C",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  earningsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  earningsAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  detailTitle: {
    fontSize: 16,
    color: "black",
  },
  detailValue: {
    fontSize: 16,
    color: "black",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginRight: 5,
  },
});

export default TripDetailsScreen;
