import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const TripDetails = ({ tripState, onAccept, onDecline }) => {
  const renderTripDetailsContent = () => {
    switch (tripState) {
      case "En Route":
        return (
          <View style={styles.tripDetails}>
            <Text style={styles.driverName}>Alan</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="orange" />
              <Text style={styles.ratingText}>4.0</Text>
            </View>
            <Text style={styles.etaText}>3.92 mins • 0.89 kms</Text>
            <Text style={styles.priceText}>£1.29</Text>
            <Text style={styles.estimateText}>Estimated price</Text>
          </View>
        );
      case "Trip Details":
        return (
          <View style={styles.tripDetails}>
            <Text style={styles.driverName}>Alan</Text>
            <Text style={styles.priceText}>£5.20</Text>
            <Text style={styles.tripInfoText}>
              Trip completed successfully.
            </Text>
          </View>
        );
      case "Trip Ended":
        return (
          <View style={styles.tripDetails}>
            <Text style={styles.driverName}>Alan</Text>
            <Text style={styles.priceText}>£5.20</Text>
            <Text style={styles.tripInfoText}>
              Thank you for riding with us!
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderTripDetailsContent()}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.declineButton} onPress={onDecline}>
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
          <Text style={styles.acceptButtonText}>Tracking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f7f8fa",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tripDetails: {
    alignItems: "center",
    marginBottom: 20,
  },
  driverName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#888",
  },
  etaText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  estimateText: {
    fontSize: 14,
    color: "gray",
  },
  tripInfoText: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  declineButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  declineButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  acceptButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  acceptButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default TripDetails;
