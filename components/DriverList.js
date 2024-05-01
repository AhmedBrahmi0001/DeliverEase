import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { DriversImages } from "../constants/DriversImages";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

function DriverList() {
  const navigation = useNavigation();
  return (
    <View className="mx-4 flex-row justify-between flex-wrap">
      {DriversImages.map((item, index) => {
        return <DriverCard navigation={navigation} item={item} key={index} />;
      })}
    </View>
  );
}
const DriverCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Driver", { ...item })}
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
        start={{ x: 0.5, y: 1 }}
        className="absolute bottom-0"
      />

      <View className=" flex-row space-x-2  rounded-full ">
        <FontAwesome
          style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          name="star"
          size={wp(5)}
          color="#fde047"
        />
        <Text style={{ fontSize: wp(4) }} className="text-white">
          {item.rating}
        </Text>
      </View>

      <Text
        style={{ fontSize: wp(4) }}
        className="text-white font font-semibold"
      >
        {item.title}
      </Text>
      <Text
        style={{ fontSize: wp(4) }}
        className="text-white font font-semibold"
      >
        {item.price}
      </Text>
    </TouchableOpacity>
  );
};

export default DriverList;
