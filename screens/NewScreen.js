import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const NewScreen = () => {
  const orderDetails = {
    storeName: "Shoppers Drug Mart",
    orderNumber: "SHO2086000123",
    fromAddress: "366 Main St N, Brampton, Ontario, L6V 1P8",
    toAddress: "14 Grantbrook St, North York, Ontario, M2R 2E7",
    details: [
      { label: "Order #", value: "SHO2086000123" },
      { label: "Distance", value: "1.46 km" },
      { label: "Customer name", value: "Rosalba Sanders" },
      { label: "Unit #", value: "17" },
      { label: "Buzzer #", value: "5" },
      { label: "Customer needs to pay", value: "$85.00" },
    ],
    specialReq: "Fridge",
    authorizedPersons: "Alex",
  };

  const renderDetailItem = ({ label, value }) => (
    <View style={styles.detailRow} key={label}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.storeName}>{orderDetails.storeName}</Text>
          <Text style={styles.orderNumber}>
            Order #: {orderDetails.orderNumber}
          </Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Address Arrival</Text>
          <View style={styles.iconRow}>
            <FontAwesome name="map-marker" color="#007BFF" size={16} />
            <Text style={styles.address}>{orderDetails.fromAddress}</Text>
          </View>
          <Text style={styles.addressLabel}>Address Return</Text>
          <View style={styles.iconRow}>
            <FontAwesome name="map-marker" color="#007BFF" size={16} />
            <Text style={styles.address}>{orderDetails.toAddress}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          {orderDetails.details.map(renderDetailItem)}
          <View style={styles.detailRow}>
            <Text style={styles.label}>Customer Phone</Text>
            <TouchableOpacity>
              <Text style={styles.callNow}>Call now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Special Req</Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{orderDetails.specialReq}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Authorized persons</Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {orderDetails.authorizedPersons}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  storeName: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  orderNumber: {
    color: "#FFF",
    marginTop: 4,
  },
  addressContainer: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 8,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  address: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  detailsContainer: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
  },
  value: {
    color: "#555",
  },
  callNow: {
    color: "#007BFF",
    marginBottom: 8,
  },
  tag: {
    backgroundColor: "#007BFF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 4,
    marginBottom: 8,
  },
  tagText: {
    color: "#FFF",
  },
});

export default NewScreen;
