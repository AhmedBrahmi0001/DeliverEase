import React from "react";
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
  const { orderId } = props.route.params;
  const { data: orders, error, isLoading } = useGetOrderModel(orderId);

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
          <Text style={styles.Ordername}>{orders?.name}</Text>
          <Text style={styles.orderNumber}>Order #: {orders?.orderId}</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Pickup_address</Text>
          <View style={styles.iconRow}>
            <FontAwesome name="map-marker" color="#007BFF" size={16} />
            <Text style={styles.address}>{orders?.pickup_address}</Text>
          </View>
          <Text style={styles.addressLabel}>Deliver_address</Text>
          <View style={styles.iconRow}>
            <FontAwesome name="map-marker" color="#007BFF" size={16} />
            <Text style={styles.address}>{orders?.deliver_address}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          {order?.data?.map(renderDetailItem)}
          <View style={styles.detailRow}>
            <Text style={styles.label}>Customer Phone</Text>
            <TouchableOpacity>
              <Text style={styles.callNow}>Call now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Special Req</Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{orders.specialReq}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Etat</Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{orders.Etat}</Text>
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
  Ordername: {
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
});

export default NewScreen;
