import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import ListCategories from "../components/ListCategories";
import Places from "../components/Places";
import DriverList from "../components/DriverList";
import NotificationBadge from "../components/NotificationBadge";
import { useNotificationModels } from "../hooks/notification.api";
import { useDriverModels } from "../hooks/driver.api";

//import ImageSlider from "../components/ImageSlider";

const HomeScreen = () => {
  const navigation = useNavigation();

  // Price Slider
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(400);

  //Rating Star
  const [rating, setRating] = useState(0);

  // Place
  const [selectedPlace, setSelectedPlace] = useState("");

  const {
    data: drivers,
    error: driversError,
    isLoading: driversLoading,
  } = useDriverModels({ low, high, rating, place: selectedPlace });

  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("");

  const { data: notifications } = useNotificationModels();

  useEffect(() => {
    if (notifications) {
      const unreadNotifications = notifications.data.filter(
        (notification) => !notification.is_read
      ).length;
      setUnreadCount(unreadNotifications);
    }
  }, [notifications]);

  return (
    <SafeAreaView className="bg-white ">
      <ScrollView>
        <StatusBar barStyle="dark-content" />
        {/*image logo*/}
        <View className="flex justify-between ">
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/images/logo0.png")}
                style={styles.logo}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notification")}
            className="absolute top-1.5 right-7 mt-5"
          >
            {/*image avatar
          <Image
            source={require("../assets/images/avatar.png")}
            className="h-12 w-12 rounded-full"
          />*/}

            <FontAwesome name="bell" size={33} color="gray" />
            <NotificationBadge count={unreadCount} />
          </TouchableOpacity>
        </View>

        <View className="ml-4">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now !</Text>
          <Text className="font-semibold ">Current Location</Text>
        </View>
        {/*listCategorie */}
        <View>
          <ListCategories
            low={low}
            high={high}
            setLow={setLow}
            setHigh={setHigh}
            rating={rating}
            setRating={setRating}
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
          />
        </View>
        {/*Place */}
        {/* <View className="mt-4">
          <Places />
        </View> */}
        {/*DriverList*/}
        <View className="mt-4">
          <DriverList
            drivers={drivers}
            driversError={driversError}
            driversLoading={driversLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = {
  container: {
    // Align the logo to the left
    alignItems: "flex-start",
    padding: 20, // Add padding around the container
  },
  logoContainer: {
    // Apply shadow effects to the container wrapping the logo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5, // Elevation for Android shadow
    backgroundColor: "transparent", // Ensure background color does not interfere with the shadow
    borderRadius: 18, // Rounded corners for the container
    padding: 5, // Padding around the logo
  },
  logo: {
    width: 100, // Width of the logo
    height: 80, // Height of the logo
    resizeMode: "stretch", // Preserve aspect ratio
    borderRadius: 18, // Slightly rounded corners for the image
    borderWidth: 2, // Thin border width
    borderColor: "#007bff", // Border color to make it stand out
    backgroundColor: "white", // Background color for a clean look
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 8, // Shadow radius
    elevation: 3, // Elevation for Android shadow
  },
};

export default HomeScreen;
