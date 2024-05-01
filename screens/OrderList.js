import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableHighlight,
} from "react-native";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OrderList({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    retrieveOrders();
  }, []);

  const retrieveOrders = async () => {
    try {
      const storedOrders = await AsyncStorage.getItem("orders");
      if (storedOrders !== null) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch (error) {
      console.error("Error retrieving orders:", error);
    }
  };

  const handleDeleteOrder = async (index) => {
    try {
      const updatedOrders = [...orders];
      updatedOrders.splice(index, 1);
      await AsyncStorage.setItem("orders", JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleConfirmOrder = (order) => {
    setSelectedOrder(order);
    setConfirmModalVisible(true);
  };
  const handleShowDetailsOrder = (order) => {
    setSelectedOrder(order);
    setDetailsModalVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.orderItem,
        index !== orders.length - 1 && styles.separator,
      ]}
    >
      <Text>{item.name}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleDeleteOrder(index)}
          style={styles.deleteButton}
        >
          <FontAwesome name="trash" size={20} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleConfirmOrder(item)}
          style={styles.confirmButton}
        >
          <FontAwesome name="check-circle" size={20} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleShowDetailsOrder(item)}
          style={styles.confirmButton}
        >
          <FontAwesome name="info-circle" size={20} color="#007bff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Order List</Text>
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No orders</Text>}
        />
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
          labelStyle={styles.goBackButtonText}
        >
          Go Back
        </Button>
        {/* Modal for confirmation */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmModalVisible}
          onRequestClose={() => {
            setConfirmModalVisible(!confirmModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Confirm Order: {selectedOrder && selectedOrder.name}</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setConfirmModalVisible(!confirmModalVisible);
                }}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        {/* Render the order details modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={detailsModalVisible}
          onRequestClose={() => {
            setDetailsModalVisible(!DetailsModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/*Order details content*/}
              <Text>Order details</Text>
              <Text>Name: {selectedOrder && selectedOrder.name}</Text>
              <Text>Date:{selectedOrder && selectedOrder.date}</Text>
              <Text>
                AdressArrival:{selectedOrder && selectedOrder.addressArrival}
              </Text>
              <Text>
                AdressReturn:{selectedOrder && selectedOrder.addressReturn}
              </Text>
              <Text>Quantity:{selectedOrder && selectedOrder.quantity}</Text>
              {/* Render description inputs here */}
              <Text>Description Inputs:</Text>
              {selectedOrder &&
                selectedOrder.descriptionInputs.map((input, index) => (
                  <Text key={index}>{input}</Text>
                ))}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setDetailsModalVisible(false)}
              >
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    padding: 5,
    marginLeft: "auto",
  },
  closeButton: {
    marginTop: 5,
    backgroundColor: "#2196F3",
    borderRadius: 20,
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  confirmButton: {
    padding: 5,
  },
  goBackButton: {
    borderRadius: 8,
    backgroundColor: "#007bff",
    marginTop: 20,
  },
  goBackButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 45,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10, // Add some padding to separate the orders visually
  },
});
