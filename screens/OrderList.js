import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import HistoryScreen from "./HistoryScreen";

const Tab = createMaterialTopTabNavigator();
// Static orders data
const orders = [
  {
    name: "Order 1",
    date: "May 9, 2024",
    addressArrival: "366 Main St N, Brampton Ontario L6V 1P8",
    addressReturn: "123 Elm St, Toronto Ontario M5J 2T9",
  },
  {
    name: "Order 2",
    date: "May 8, 2024",
    addressArrival: "770 Lawrence Ave W, Toronto Ontario M6A 3C6",
    addressReturn: "456 Maple St, Brampton Ontario L6Y 3P8",
  },
];

// Reusable OrderItem component
function OrderItem({ order }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { order })}
      style={styles.orderItem}
    >
      <View style={styles.orderInfoContainer}>
        <Text style={styles.orderName}>{order.name}</Text>
        <Text style={styles.orderAddress}>{order.addressArrival}</Text>
        <Text style={styles.orderAddress}>{order.addressReturn}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.deleteButton}>
          <FontAwesome name="trash" size={20} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.confirmButton}>
          <FontAwesome name="check-circle" size={20} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.detailsButton}>
          <FontAwesome name="info-circle" size={20} color="#007bff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// Today screen component
function TodayScreen() {
  return (
    <View style={styles.tabContainer}>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <OrderItem order={item} />}
        ListEmptyComponent={<Text>No orders for today</Text>}
      />
    </View>
  );
}

// History screen component
// function HistoryScreen() {

//   return (
//     <View
//       style={styles.tabContainer}
//       onPress={() => navigation.navigate("Details")}
//     ></View>
//   );
// }

export default function OrderList() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Today" component={TodayScreen} />
        <Tab.Screen name="history" component={HistoryScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  tabContainer: {
    flex: 1,
    padding: 20,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  blueBackground: {
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    padding: 5,
    marginLeft: "auto",
  },
  confirmButton: {
    padding: 5,
  },
  detailsButton: {
    padding: 5,
  },
  orderInfoContainer: {
    flex: 1,
  },
  orderName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderAddress: {
    fontSize: 14,
    color: "#666",
  },
});
