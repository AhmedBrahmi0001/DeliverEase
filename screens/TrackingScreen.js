import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

import TripDetails from "../components/TripDetails"; // Import the TripDetails component

const screenHeight = Dimensions.get("window").height;

const TrackingScreen = () => {
  const [driverLocation, setDriverLocation] = useState({
    latitude: 35.8256, // Initial latitude
    longitude: 10.638, // Initial longitude
  });
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [orderStatus, setOrderStatus] = useState("En Route");
  const [isModalVisible, setModalVisible] = useState(false);
  const [tripState, setTripState] = useState("En Route"); // New state for trip details

  useEffect(() => {
    const ws = new WebSocket("wss://example.com/socket");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setDriverLocation({ latitude: data.latitude, longitude: data.longitude });

      setRouteCoordinates((prevCoordinates) => [
        ...prevCoordinates,
        { latitude: data.latitude, longitude: data.longitude },
      ]);

      setOrderStatus(data.status);
      setTripState(data.status); // Update trip state based on data
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleRefresh = () => {
    alert("Refreshing...");
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setDriverLocation({ latitude, longitude });
  };

  useEffect(() => {
    if (driverLocation.latitude !== 0 && driverLocation.longitude !== 0) {
      setDestination({
        latitude: 35.777, // Destination latitude
        longitude: 10.8262, // Destination longitude
      });
    }
  }, [driverLocation]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAccept = () => {
    if (tripState === "En Route") {
      setTripState("Trip Details");
    } else if (tripState === "Trip a") {
      setTripState("Trip Ended");
    } else if (tripState === "Trip Ended") {
      setTripState("En Route");
    }
  };

  const handleDecline = () => {
    alert("Trip Declined");
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        <Marker
          coordinate={driverLocation}
          title="Driver's Location"
          description={`Status: ${orderStatus}`}
        />
        {destination && (
          <Marker
            coordinate={destination}
            title="Destination"
            description="Arrived Destination"
          />
        )}
        <Polyline
          coordinates={routeCoordinates}
          strokeWidth={4}
          strokeColor="#3b82f6"
        />
      </MapView>

      <TouchableOpacity style={styles.tripDetailsButton} onPress={toggleModal}>
        <Text style={styles.tripDetailsButtonText}>Show Trip Details</Text>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={toggleModal}
        swipeDirection="down"
        style={styles.modal}
        propagateSwipe
      >
        <View style={styles.modalContent}>
          <PanGestureHandler onGestureEvent={toggleModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Trip Details</Text>
              <TouchableOpacity onPress={toggleModal}>
                <FontAwesome name="chevron-down" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </PanGestureHandler>
          <TripDetails
            tripState={tripState}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        </View>
      </Modal>
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <FontAwesome name="refresh" size={24} color="white" />
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  tripDetailsButton: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    opacity: 0.7,
  },
  tripDetailsButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    minHeight: screenHeight * 0.4,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  refreshButton: {
    position: "absolute",
    bottom: 25,
    left: 20,
    backgroundColor: "#3b82f6",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 1,
  },
});

export default TrackingScreen;
