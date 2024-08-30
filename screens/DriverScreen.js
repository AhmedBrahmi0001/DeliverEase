import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
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
  const { driverId } = props.route.params;

  // Fetch driver data
  const {
    data: driver,
    error: driverError,
    isLoading: driverLoading,
  } = useGetDriverModel(driverId);

  // Fetch place data using place_id from driver
  const placeId = driver?.place_id;
  const {
    data: places,
    error: placeError,
    isLoading: placeLoading,
  } = useGetPlaceModel(placeId);

  // // Fetch evaluations data
  // const {
  //   data: evaluations,
  //   error: evaluationError,
  //   isLoading: evaluationLoading,
  // } = useEvaluationModels(driverId);

  // State to hold average rating
  const [averageRating, setAverageRating] = useState(0);

  // Calculate average rating when evaluations change
  useEffect(() => {
    if (driver?.evaluations && driver?.evaluations.length) {
      const totalRating = driver?.evaluations.reduce(
        (sum, evaluation) => sum + evaluation.rating,
        0
      );
      const avgRating = totalRating / driver?.evaluations.length;
      setAverageRating(avgRating);
    }
  }, [driver?.evaluations]);

  // Handle loading state
  if (driverLoading || placeLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  // Handle error state
  if (driverError || placeError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error: {driverError?.message || placeError?.message}
        </Text>
      </View>
    );
  }

  // Handle no driver found state
  if (!driver) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Driver not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        source={{ uri: driver?.image }}
        style={{ width: wp(100), height: hp(55) }}
      />
      <StatusBar style="light" />
      <SafeAreaView
        style={{
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: wp(3),
            borderRadius: wp(10),
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <FontAwesome
            name="chevron-left"
            size={wp(6)}
            strokewidth={4}
            color="#334155"
          />
        </TouchableOpacity>
      </SafeAreaView>
      <View
        style={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: "white",
          paddingHorizontal: wp(5),
          paddingTop: hp(8),
          marginTop: -hp(14),
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: hp(10) }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{ fontSize: wp(6), fontWeight: "bold", color: "#334155" }}
            >
              {driver.name}
            </Text>
            {/*<Text
              style={{ fontSize: wp(6), color: "#3b82f6", fontWeight: "bold" }}
            >
              {driver.price} TN
            </Text*/}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: hp(2),
            }}
          >
            <FontAwesome
              name="money"
              size={wp(6)}
              color="#22780f"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: wp(10),
                padding: wp(3),
              }}
            />
            <Text
              style={{ fontSize: wp(5.8), marginLeft: wp(2), color: "#334155" }}
            >
              {driver.price} TN
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: hp(1),
            }}
          >
            <FontAwesome
              name="star"
              size={wp(6)}
              color="#fde047"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: wp(10),
                padding: wp(3),
              }}
            />
            <Text
              style={{ fontSize: wp(5.8), marginLeft: wp(2), color: "#334155" }}
            >
              {driver.rating}
            </Text>
          </View>
          {/*<Text style={{ fontSize: wp(4), color: "#334155", marginTop: hp(2) }}>
            {driver.description}
          </Text>*/}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: hp(2),
            }}
          >
            <FontAwesome
              name="map-marker"
              size={wp(6)}
              color="#3b82f6"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: wp(10),
                padding: wp(3),
              }}
            />
            <Text
              style={{ fontSize: wp(5.8), marginLeft: wp(2), color: "#334155" }}
            >
              {places?.name}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#3b82f6",
              borderRadius: wp(8),
              paddingVertical: hp(1.5),
              alignItems: "center",
              marginTop: hp(10),
            }}
            onPress={() => navigation.navigate("Order", { driverId })}
          >
            <Text
              style={{ fontSize: wp(5), fontWeight: "bold", color: "white" }}
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
              style={{ fontSize: wp(5), fontWeight: "bold", color: "white" }}
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
