import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useOrderModels } from "../hooks/order.api";
import moment from "moment";

const TrackTripsScreen = () => {
  const navigation = useNavigation();
  const { data: orders, error, isLoading } = useOrderModels();
  const [activeTab, setActiveTab] = useState("Past");
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Function to filter orders based on created_at date
  useEffect(() => {
    if (orders?.data?.length) {
      const currentDate = moment();
      const todayDateString = currentDate.format("YYYY-MM-DD");

      const filteredOrders = orders.data.filter((order) => {
        const orderDate = moment(order.created_at).startOf("day");

        switch (activeTab) {
          case "Current":
            return orderDate.isSame(currentDate, "day");

          case "Past":
            return orderDate.isBefore(currentDate, "day");

          default:
            return true; // Default case, return all orders
        }
      });

      setFilteredOrders(filteredOrders);
    }
  }, [activeTab, orders]);

  // Function to get color based on etat
  const getStatusColor = (etat) => {
    switch (etat) {
      case "pending":
        return "#FFA500"; // Orange
      case "accepted":
        return "#3b82f6"; // Blue
      case "ongoing":
        return "#1e90ff"; // Light Blue
      case "delivered":
        return "#32CD32"; // LimeGreen
      case "rejected":
        return "#FF0000"; // Red
      case "cancelled":
        return "#A9A9A9"; // DarkGray
      default:
        return "#000000"; // Black
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  // Check if places is undefined
  if (!orders?.data?.length) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No orders found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Current" && styles.activeTab]}
          onPress={() => setActiveTab("Current")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Current" && styles.activeTabText,
            ]}
          >
            Current
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Past" && styles.activeTab]}
          onPress={() => setActiveTab("Past")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Past" && styles.activeTabText,
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {filteredOrders.map((order) => (
          <View key={order?.id} style={styles.tripCard}>
            <View style={styles.tripHeader}>
              <FontAwesome name="clock-o" size={16} color="gray" />
              <Text style={styles.tripDate}>
                {`${order.delivered_date}//${order?.code}`}
              </Text>
              <View style={styles.tripAmountContainer}>
                <FontAwesome name="money" size={16} color="gray" />
                <Text style={styles.tripAmount}>{order?.price}</Text>
              </View>
            </View>
            <View style={styles.tripDetails}>
              <Text style={styles.texttripAddress}>pickup_address</Text>
              <Text style={styles.tripAddress}>{order?.pickup_address}</Text>
              <Text style={styles.texttripAddress}>deliver_address</Text>
              <Text style={styles.tripAddress}>{order?.deliver_address}</Text>
              <View style={styles.quantityRow}>
                <Text style={styles.texttripAddress}>Quantity :</Text>
                <Text style={styles.textquantity}>
                  {" "}
                  {order?.quantity} units
                </Text>
              </View>
            </View>

            <View style={styles.tripFooter}>
              <Text style={styles.texttripAddress}>Etat : </Text>
              <Text
                style={[
                  styles.tripStatus,
                  { color: getStatusColor(order?.etat) },
                ]}
              >
                {order?.etat}
              </Text>
            </View>
            {/*<View style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>View details</Text>
            </View>*/}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BDC3C7",
    paddingHorizontal: 14,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 1,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  activeTab: {
    backgroundColor: "#1e90ff",
  },
  tabText: {
    color: "black",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "black",
  },
  scrollViewContent: {
    paddingBottom: 16,
  },
  tripCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  tripHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tripDate: {
    color: "gray",
    marginLeft: 8,
    fontSize: 14,
  },
  tripAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tripAmount: {
    color: "gray",
    marginLeft: 4,
    fontSize: 14,
  },
  tripDetails: {
    marginVertical: 16,
  },
  texttripAddress: {
    color: "gray",
    fontSize: 14,
    marginBottom: 4,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tripAddress: {
    color: "black",
    fontSize: 16,
    marginBottom: 4,
  },
  tripFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  carImage: {
    width: 70,
    height: 60,
    resizeMode: "contain",
    borderRadius: 10,
  },
  textquantity: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  drivername: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  tripStatus: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsButton: {
    marginTop: 16,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#1e90ff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default TrackTripsScreen;
