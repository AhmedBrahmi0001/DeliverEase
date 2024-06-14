// NewScreen.js

import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useGetOrderModel } from "../hooks/order.api";

const NewScreen = (props) => {
  const navigation = useNavigation();
  const { orderId } = props.route.params || {};
  const { data: order, error, isLoading } = useGetOrderModel(orderId);
  useEffect(() => {
    // Auto-navigation logic to the "DetailsOrder" screen
    if (order) {
      navigation.navigate("DetailsOrder", { orderId: order.id });
    }
  }, [order, navigation]); // This effect runs when 'order' or 'navigation' changes

  const renderDetailItem = ({ label, value }) => (
    <View style={styles.detailRow} key={label}>
      <Text
        style={[
          styles.label,
          label === "Description #" && styles.descriptionLabel,
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.value,
          label === "Description #" && styles.descriptionValue,
        ]}
      >
        {value}
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.orderName}>{order?.name}</Text>
          <Text style={styles.orderNumber}>Order #: {order?.id}</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Pickup Address</Text>
          <View style={styles.iconRow}>
            <FontAwesome name="map-marker" color="#007BFF" size={16} />
            <Text style={styles.address}>{order?.pickup_address}</Text>
          </View>
          <Text style={styles.addressLabel}>Deliver Address</Text>
          <View style={styles.iconRow}>
            <FontAwesome name="map-marker" color="#007BFF" size={16} />
            <Text style={styles.address}>{order?.deliver_address}</Text>
          </View>
          <Text style={styles.addressLabel}>Description</Text>
          <View style={styles.iconRow}>
            <FontAwesome name="" color="#007BFF" size={16} />
            <Text style={styles.address}>{order?.description}</Text>
          </View>
          <Text style={styles.addressLabel}>delivered_date</Text>
          <View style={styles.iconRow}>
            <FontAwesome name="calendar" color="#007BFF" size={16} />
            <Text style={styles.address}>{order?.delivered_date}</Text>
          </View>
          <Text style={styles.addressLabel}>quantity</Text>
          <View style={styles.iconRow}>
            <FontAwesome name="stack-overflow" color="#007BFF" size={16} />
            <Text style={styles.address}>{order?.quantity} units</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          {Object.keys(order?.data || {}).map((key) =>
            renderDetailItem({ label: key, value: order.data[key] })
          )}
          <View style={styles.detailRow}>
            <Text style={styles.label}>Client Name</Text>
            <Text style={styles.value}>{order?.client?.user?.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Driver Name</Text>
            <Text style={styles.value}>{order?.driver?.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Customer Phone</Text>
            <TouchableOpacity>
              <Text style={styles.callNow}>Call now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Details</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetailsOrder", { orderId: order.id })
              }
            >
              <Text style={styles.callNow}>Details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Etat</Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{order?.etat}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Price</Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{order?.price} TN</Text>
            </View>
          </View>
          <Button
            title="Validate"
            onPress={() => navigation.navigate("Tracking")}
            color="#007BFF"
          />
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
  orderName: {
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
    alignItems: "flex-start",
    marginVertical: 4,
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
    flex: 1,
  },
  descriptionLabel: {
    flex: 1,
  },
  value: {
    color: "#555",
    flex: 2,
    textAlign: "right",
  },
  descriptionValue: {
    flex: 3,
    textAlign: "left",
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
    color: "red",
  },
});

export default NewScreen;
