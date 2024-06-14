import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useGetDriverModel } from "../hooks/driver.api";
import { useGetPlaceModel } from "../hooks/places.api";
import { useEvaluationModels } from "../hooks/evaluation.api";

const DriverScreen = (props) => {
  const navigation = useNavigation();
  // Assuming driverId is passed through route params
  const { driverId } = props.route.params;
  const { data: drivers, error, isLoading } = useGetDriverModel(driverId);

  // Fetch place data using the place_id from drivers
  const placeId = drivers?.place_id;
  const {
    data: places,
    error: placeError,
    isLoading: placeLoading,
  } = useGetPlaceModel(placeId);

  // Render loading state
  if (isLoading || placeLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  // Render error state
  if (error || placeError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error: {error?.message || placeError?.message}
        </Text>
      </View>
    );
  }

  // Render no drivers found state
  if (!drivers) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Driver not found.</Text>
      </View>
    );
  }

  return (
    <View className="bg-white flex-1">
      {/* Driver image */}
      <Image
        source={{ uri: drivers?.image }}
        style={{ width: wp(100), height: hp(55) }}
      />
      <StatusBar style={"light"} />
      {/* Back button */}
      <SafeAreaView className="flex-row justify-between items-center w-full absolute">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-4"
          style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        >
          <FontAwesome
            name="chevron-left"
            size={wp(7)}
            strokewidth={4}
            color="#334155"
          />
        </TouchableOpacity>
      </SafeAreaView>
      {/* Title, description & rating */}
      <View
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="px-5 flex-1 justify-between bg-white pt-8 -mt-14"
      >
        <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
          <View className="flex-row justify-between items-start">
            <Text
              style={{ fontSize: wp(7) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {drivers?.name}
            </Text>
            <Text
              style={{ fontSize: wp(7), color: "#3b82f6" }}
              className="font-semibold"
            >
              {drivers?.price}
            </Text>
          </View>
          <View className="flex-row space-x-2 rounded-full">
            <FontAwesome
              style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              name="star"
              size={wp(7.5)}
              color="#fde047"
            />
            <Text style={{ fontSize: wp(5.8) }} className="text-neutral-700">
              {drivers?.rating}
            </Text>
          </View>
          <Text
            style={{ fontSize: wp(3.7) }}
            className="font-semibold text-neutral-700 tracking-wide mb-2"
          >
            {drivers.description}
          </Text>
          <View className="flex-row space-x-2">
            <FontAwesome name="map-marker" size={wp(7.5)} color="#3b82f6" />
            <Text style={{ fontSize: wp(5.8) }} className="text-neutral-700">
              {places?.name} {/* Display place name */}
            </Text>
          </View>
          {/* Order button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#3b82f6",
              borderRadius: wp(8),
              paddingVertical: hp(1.5),
              alignItems: "center",
              marginTop: hp(2),
            }}
            onPress={() => navigation.navigate("Order", { driverId })}
          >
            <Text
              style={{
                fontSize: wp(5),
                fontWeight: "bold",
                color: "white",
              }}
            >
              Create
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#3b82f6",
              borderRadius: wp(8),
              paddingVertical: hp(1.5),
              alignItems: "center",
              marginTop: hp(2),
            }}
            onPress={() => navigation.navigate("Review", { driverId })}
          >
            <Text
              style={{
                fontSize: wp(5),
                fontWeight: "bold",
                color: "white",
              }}
            >
              Review
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 18,
    color: "red",
  },
});

export default DriverScreen;
