import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OrderScreen({ navigation }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [addressArrival, setAddressArrival] = useState("");
  const [addressReturn, setAddressReturn] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [descriptionInputs, setDescriptionInputs] = useState([""]);
  const [placeholderText, setPlaceholderText] = useState("MM/DD/YYYY");

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddDescriptionInput = () => {
    setDescriptionInputs([...descriptionInputs, ""]);
  };

  const handleRemoveDescriptionInput = (index) => {
    const updatedInputs = [...descriptionInputs];
    updatedInputs.splice(index, 1);
    setDescriptionInputs(updatedInputs);
  };
  const handleOrder = async () => {
    const order = {
      name,
      date,
      addressArrival,
      addressReturn,
      quantity,
      descriptionInputs,
    };

    try {
      const storedOrders = await AsyncStorage.getItem("orders");
      let orders = storedOrders ? JSON.parse(storedOrders) : [];
      orders.push(order);
      await AsyncStorage.setItem("orders", JSON.stringify(orders));
      navigation.navigate("OrderList");
    } catch (error) {
      console.error("Error storing order:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Order Form</Text>
          <View style={styles.inputContainer}>
            <TextInput
              label="Name"
              value={name}
              onChangeText={(text) => setName(text)}
              mode="outlined"
              left={<FontAwesome name="user" size={24} color="black" />}
              style={styles.input}
            />
            <TextInput
              label="Date"
              value={date}
              onChangeText={(text) => setDate(text)}
              mode="outlined"
              left={<FontAwesome name="calendar" size={24} color="black" />}
              style={styles.input}
              placeholder={placeholderText} // Dynamically set placeholder text
              onFocus={() => setPlaceholderText("MM/DD/YYYY")} // Change placeholder text on focus
            />
            <TextInput
              label="Address Arrival"
              value={addressArrival}
              onChangeText={(text) => setAddressArrival(text)}
              mode="outlined"
              left={<FontAwesome name="map-marker" size={24} color="black" />}
              style={styles.input}
            />
            <TextInput
              label="Address Return"
              value={addressReturn}
              onChangeText={(text) => setAddressReturn(text)}
              mode="outlined"
              left={<FontAwesome name="map-marker" size={24} color="black" />}
              style={styles.input}
            />
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleDecrement}>
                <FontAwesome name="minus" size={24} color="black" />
              </TouchableOpacity>
              <TextInput
                label="Quantity"
                value={quantity.toString()}
                mode="outlined"
                style={styles.quantityInput}
                editable={false}
              />
              <TouchableOpacity onPress={handleIncrement}>
                <FontAwesome name="plus" size={24} color="black" />
              </TouchableOpacity>
            </View>
            {descriptionInputs.map((input, index) => (
              <View key={index} style={styles.descriptionInputContainer}>
                <TextInput
                  label={`Description ${index + 1}`}
                  value={input}
                  onChangeText={(text) => {
                    const updatedInputs = [...descriptionInputs];
                    updatedInputs[index] = text;
                    setDescriptionInputs(updatedInputs);
                  }}
                  mode="outlined"
                  multiline={true}
                  numberOfLines={4}
                  style={styles.descriptionInput}
                />
                <TouchableOpacity
                  onPress={() => handleRemoveDescriptionInput(index)}
                >
                  <FontAwesome name="trash" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={styles.addDescriptionButton}
              onPress={handleAddDescriptionInput}
            >
              <Text style={styles.addDescriptionButtonText}>
                Add Description
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            mode="contained"
            onPress={handleOrder}
            style={styles.orderButton}
            labelStyle={styles.orderButtonText}
          >
            Confirm Order
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityInput: {
    flex: 1,
    marginHorizontal: 10,
    textAlign: "center",
  },
  descriptionInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  descriptionInput: {
    flex: 1,
    marginRight: 10,
  },
  addDescriptionButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  addDescriptionButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  orderButton: {
    borderRadius: 8,
    backgroundColor: "#007bff",
    marginTop: 20,
  },
  orderButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
