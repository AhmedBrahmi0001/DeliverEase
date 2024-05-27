import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const tripsData = [
  {
    id: 1,
    date: "02-05-2023",
    time: "02:39 PM",
    amount: "£1.92",
    from: "3 Clive Rd, Clive Road, England, United Kingdom-DA11 0AU",
    to: "1 Trafalgar Rd, Trafalgar Road, England, United Kingdom-DA11 0QA",
    carType: "Executive",
    status: "Completed",
  },
  {
    id: 2,
    date: "02-05-2023",
    time: "02:34 PM",
    amount: "£0.90",
    from: "3 Clive Rd, Clive Road, England, United Kingdom-DA11 0AU",
    to: "91 Wrotham Rd, Wrotham Road, England, United Kingdom-DA11 0QB",
    carType: "Executive",
    status: "Completed",
  },
  {
    id: 3,
    date: "28-04-2023",
    time: "07:27 AM",
    amount: "£0.89",
    from: "3 Clive Rd, Clive Road, England, United Kingdom-DA11 0AU",
    to: "1 Trafalgar Rd, Trafalgar Road, England, United Kingdom-DA11 0QA",
    carType: "Executive",
    status: "Completed",
  },
];

const TrackTripsScreen = () => {
  const [activeTab, setActiveTab] = useState("Past");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Track your trips</Text>
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
        {tripsData.map((trip) => (
          <View key={trip.id} style={styles.tripCard}>
            <View style={styles.tripHeader}>
              <FontAwesome name="clock-o" size={16} color="gray" />
              <Text style={styles.tripDate}>{`${trip.date}/${trip.time}`}</Text>
              <View style={styles.tripAmountContainer}>
                <FontAwesome name="money" size={16} color="gray" />
                <Text style={styles.tripAmount}>{trip.amount}</Text>
              </View>
            </View>
            <View style={styles.tripDetails}>
              <Text style={styles.tripAddress}>{trip.from}</Text>
              <Text style={styles.tripAddress}>{trip.to}</Text>
            </View>
            <View style={styles.tripFooter}>
              <Image
                source={{ uri: "https://via.placeholder.com/50" }} // Replace with actual car image
                style={styles.carImage}
              />
              <Text style={styles.carType}>{trip.carType}</Text>
              <Text style={styles.tripStatus}>{trip.status}</Text>
            </View>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>View details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 16,
    textAlign: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "white",
  },
  tabText: {
    color: "white",
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
  tripAddress: {
    color: "black",
    fontSize: 16,
    marginBottom: 4,
  },
  tripFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  carImage: {
    width: 50,
    height: 30,
    resizeMode: "contain",
  },
  carType: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  tripStatus: {
    color: "green",
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
});

export default TrackTripsScreen;
