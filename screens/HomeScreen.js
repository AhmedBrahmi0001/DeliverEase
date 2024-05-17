import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ListCategories from "../components/ListCategories";
import Places from "../components/Places";
import DriverList from "../components/DriverList";

//import ImageSlider from "../components/ImageSlider";

const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-white ">
      <ScrollView>
        <StatusBar barStyle="dark-content" />
        {/*image logo*/}
        <View className="flex justify-between ">
          <View>
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={require("../assets/images/deliver.png")}
            />
          </View>
          <View className="absolute top-1.5 right-5 mt-5">
            {/*image avatar
          <Image
            source={require("../assets/images/avatar.png")}
            className="h-12 w-12 rounded-full"
          />*/}

            <FontAwesome name="bell" size={30} color="gray" />
          </View>
        </View>

        <View className="ml-4">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now !</Text>
          <Text className="font-semibold ">Current Location</Text>
        </View>
        {/*listCategorie */}
        <View>
          <ListCategories />
        </View>
        {/*Place */}
        {/* <View className="mt-4">
          <Places />
        </View> */}
        {/*DriverList*/}
        <View className="mt-4">
          <DriverList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
