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
import { useCreateOrderModel } from "../hooks/order.api";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function OrderScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [delivered_date, setDate] = useState("");
  const [pickup_address, setpickup_address] = useState("");
  const [deliver_address, setdeliver_address] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState([""]);
  const [placeholderText, setPlaceholderText] = useState("MM/DD/YYYY");

  const { driverId } = route.params || {};
  const [latitude_pickup_address, setLatitude_pickup_address] = useState("1");
  const [longitude_pickup_address, setLongitude_pickup_address] = useState("1");
  const [latitude_deliver_address, setLatitude_deliver_address] = useState("1");
  const [longitude_deliver_address, setLongitude_deliver_address] =
    useState("1");

  const createOrder = useCreateOrderModel();

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddDescriptionInput = () => {
    setDescription([...description, ""]);
  };

  const handleRemoveDescriptionInput = (index) => {
    const updatedInputs = [...description];
    updatedInputs.splice(index, 1);
    setDescription(updatedInputs);
  };
  const handleOrder = async () => {
    const descriptionString = description.join(",");
    const order = {
      pickup_address,
      deliver_address,
      quantity,
      description: descriptionString,
      // s
      latitude_pickup_address,
      longitude_pickup_address,
      latitude_deliver_address,
      longitude_deliver_address,
      client_id: 1,
      driver_id: driverId,
    };

    try {
      await createOrder.mutateAsync(order);
      navigation.navigate("OrderList");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorsObject = error.response.data;
        console.error("errorsObject: ", errorsObject);
      } else {
        console.error("Error occurred without response data:", error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Order Form</Text>
          <View style={styles.inputContainer}>
            {/* <TextInput
              label="Delivered_date"
              value={delivered_date}
              onChangeText={(text) => setDate(text)}
              mode="outlined"
              left={<FontAwesome name="calendar" size={24} color="black" />}
              style={styles.input}
              placeholder={placeholderText} // Dynamically set placeholder text
              onFocus={() => setPlaceholderText("MM/DD/YYYY")} // Change placeholder text on focus
            /> */}
            <TextInput
              label="Pickup_address"
              value={pickup_address}
              onChangeText={(text) => setpickup_address(text)}
              mode="outlined"
              left={<FontAwesome name="map-marker" size={24} color="black" />}
              style={styles.input}
            />
            <TextInput
              label="Deliver_address"
              value={deliver_address}
              onChangeText={(text) => setdeliver_address(text)}
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
            {description.map((input, index) => (
              <View key={index} style={styles.descriptionInputContainer}>
                <TextInput
                  label={`Description ${index + 1}`}
                  value={input}
                  onChangeText={(text) => {
                    const updatedInputs = [...description];
                    updatedInputs[index] = text;
                    setDescription(updatedInputs);
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
