import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";

const TrackingScreen = () => {
  const [driverLocation, setDriverLocation] = useState({
    latitude: 37.7749, // Initial latitude
    longitude: -122.4194, // Initial longitude
  });
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [orderStatus, setOrderStatus] = useState("En Route");

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

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <FontAwesome name="refresh" size={24} color="white" />
      </TouchableOpacity>
    </View>
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
  refreshButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#3b82f6",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default TrackingScreen;
