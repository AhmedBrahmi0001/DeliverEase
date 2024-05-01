import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const DriverScreen = (props) => {
  const item = props.route.params;
  const navigation = useNavigation();
  return (
    <View className="bg-white flex-1">
      {/*driver image*/}
      <Image source={item.image} style={{ width: wp(100), height: hp(55) }} />
      <StatusBar style={"light"} />
      {/*back button*/}
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
      {/* title & description & rating*/}
      <View
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="px-5 flex-1 justify-between bg-white pt-8 -mt-14"
      >
        <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
          <View className="flex-row justify-between items-start">
            <Text
              style={{ fontSize: wp(7) }}
              className=" font-bold flex-1 text-neutral-700"
            >
              {item?.title}
            </Text>
            <Text
              style={{ fontSize: wp(7), color: "#3b82f6" }}
              className=" font-semibold"
            >
              {item?.price}
            </Text>
          </View>
          <View className=" flex-row space-x-2  rounded-full ">
            <FontAwesome
              style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              name="star"
              size={wp(7.5)}
              color="#fde047"
            />
            <Text style={{ fontSize: wp(5.8) }} className="text-neutral-700 ">
              {item?.rating}
            </Text>
          </View>
          <Text
            style={{ fontSize: wp(3.7) }}
            className=" font-semibold  text-neutral-700 tracking-wide mb-2"
          >
            {item?.description}
          </Text>
          <View className=" flex-row space-x-2 ">
            <FontAwesome name="map-marker" size={wp(7.5)} color="#3b82f6" />
            <Text style={{ fontSize: wp(5.8) }} className="text-neutral-700 ">
              {item?.place}
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
            onPress={() => navigation.navigate("Order")}
          >
            <Text
              style={{
                fontSize: wp(5),
                fontWeight: "bold",
                color: "white",
              }}
            >
              Order
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
export default DriverScreen;
