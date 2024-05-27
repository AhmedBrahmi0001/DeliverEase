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

const screenHeight = Dimensions.get("window").height;

const TrackingScreen = () => {
  const [driverLocation, setDriverLocation] = useState({
    latitude: 37.7749, // Initial latitude
    longitude: -122.4194, // Initial longitude
  });
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [orderStatus, setOrderStatus] = useState("En Route");
  const [isModalVisible, setModalVisible] = useState(false);

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

  // Set destination coordinates (e.g., when driver arrives at destination)
  useEffect(() => {
    if (driverLocation.latitude !== 0 && driverLocation.longitude !== 0) {
      setDestination({
        latitude: 37.78825, // Destination latitude
        longitude: -122.4324, // Destination longitude
      });
    }
  }, [driverLocation]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Order Status: {orderStatus}</Text>
      </View>
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
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.declineButton}>
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
          </View>
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
    flex: 1,
  },
  statusContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  statusText: {
    fontSize: 16,
  },
  tripDetailsButton: {
    position: "absolute",
    bottom: 140,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 1,
  },
  tripDetailsButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    height: screenHeight / 2,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
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
  tripDetails: {
    alignItems: "center",
  },
  driverName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
  },
  etaText: {
    fontSize: 16,
    marginBottom: 5,
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  estimateText: {
    fontSize: 14,
    color: "gray",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  declineButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  declineButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  acceptButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  acceptButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  refreshButton: {
    position: "absolute",
    bottom: 90,
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
