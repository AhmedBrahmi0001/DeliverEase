import React, { useState } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
const HistoryScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [historyData, setHistoryData] = useState([
    { id: 1, title: "Son of the storm", author: "By Mark Yeet" },
    { id: 2, title: "Pride and Prejudice", author: "By Jane Austen" },
    { id: 3, title: "The Great Gatsby", author: "By F. Scott Fitzgerald" },
  ]);

  const filterHistory = () => {
    // Implement search functionality here
    return historyData.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => filterHistory(item.id)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
        <TouchableOpacity onPress={() => deleteItem(item.id)}>
          <FontAwesome name="trash" size={20} color="#3b82f6" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  const deleteItem = (itemId) => {
    const updatedHistory = historyData.filter((item) => item.id !== itemId);
    setHistoryData(updatedHistory);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <FontAwesome name="search" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
      </View>
      <FlatList
        data={filterHistory()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#e0e0e0",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  author: {
    fontSize: 14,
    color: "gray",
  },
});

export default HistoryScreen;
