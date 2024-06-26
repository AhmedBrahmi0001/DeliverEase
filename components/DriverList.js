import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React from "react";
import { DriversImages } from "../constants/DriversImages";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

function DriverList({ drivers, driversError, driversLoading }) {
  const navigation = useNavigation();

  // Render error state
  if (driversError) {
    console.log(driversError);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error: {driversError ? driversError.message : ""}
        </Text>
      </View>
    );
  }

  return (
    <>
      {driversLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : (
        <View className="mx-4 flex-row justify-between flex-wrap">
          {drivers?.data?.map((item, index) => {
            let rating = 0;
            if (item?.evaluations && item?.evaluations.length) {
              const totalRating = item?.evaluations.reduce(
                (sum, evaluation) => sum + evaluation.rating,
                0
              );
              const avgRating = totalRating / item?.evaluations.length;
              rating = avgRating;
            }
            return (
              <DriverCard
                navigation={navigation}
                item={item}
                rating={rating}
                key={index}
              />
            );
          })}
        </View>
      )}
    </>
  );
}
const DriverCard = ({ item, navigation, rating }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Driver", { driverId: item.id })}
      style={{ width: wp(44), height: wp(65) }}
      className="flex justify-end relative p-4 py-6 space-y-2 mb-5"
    >
      <Image
        source={item.image}
        style={{ width: wp(44), height: wp(65), borderRadius: 35 }}
        className="absolute"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
        style={{
          width: wp(44),
          height: hp(15),
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
        }}
        start={{ x: 0.25, y: 1.25 }}
        className="absolute bottom-0"
      />

      <View className=" flex-row space-x-2  rounded-full ">
        <FontAwesome name="star" size={wp(5.5)} color="#F4D03F" />
        <Text style={{ fontSize: wp(4) }} className="text-white">
          {rating || "No Rating"}
        </Text>
      </View>

      <Text
        style={{ fontSize: wp(4) }}
        className="text-white font font-semibold"
      >
        {item.name}
      </Text>
      <Text
        style={{ fontSize: wp(4) }}
        className="text-white font font-semibold"
      >
        {item.price} TN
      </Text>
    </TouchableOpacity>
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

export default DriverList;
