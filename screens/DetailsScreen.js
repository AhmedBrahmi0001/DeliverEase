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
import { Button } from "react-native-paper";

const DetailsScreen = (props) => {
  const navigation = useNavigation();
  return (
    <View className="bg-white flex-1">
      {/*driver image*/}
      <Image
        source={require("../assets/images/welcome.png")}
        style={{ width: wp(100), height: hp(47) }}
      />
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
        {/* Order button */}
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: wp(6),
            paddingVertical: hp(1),
            alignItems: "center",
            marginTop: hp(1),
          }}
          className="mr-3"
          onPress={() => navigation.navigate("Order")}
        >
          <Text
            style={{
              fontSize: wp(6),
              fontWeight: "bold",
              color: "#334155",
            }}
          >
            Tracking
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      {/* title & description & rating*/}
      <View
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="px-5 flex-1 justify-between bg-white pt-8 -mt-14"
      >
        <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
          <View className="flex  items-start">
            <View className="flex-row justify-between items-start  space-x-1 ">
              <FontAwesome
                style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                name="user"
                size={wp(7.5)}
                color="#fde047"
              />
              <Text
                style={{ fontSize: wp(5) }}
                className="text-neutral-700 tracking-wide mb-3 "
              >
                ID:
              </Text>
            </View>
            <View className="flex-row justify-between items-start  space-x-1 ">
              <FontAwesome
                style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                name="user"
                size={wp(7.5)}
                color="#fde047"
              />
              <Text
                style={{ fontSize: wp(5) }}
                className="text-neutral-700 tracking-wide mb-3 "
              >
                driver name
              </Text>
            </View>
            <View className="flex-row  space-x-2 ">
              <FontAwesome
                style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                name="user"
                size={wp(7.5)}
                color="#fde047"
              />
              <Text
                style={{ fontSize: wp(5), color: "#3b82f6" }}
                className=" text-neutral-700 tracking-wide "
              >
                username
              </Text>
            </View>
          </View>
          <View className=" flex-row space-x-1  rounded-full ">
            <FontAwesome
              style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              name="image"
              size={wp(7)}
              color="#fde047"
            />
            <Text style={{ fontSize: wp(5) }} className="text-neutral-700 ">
              commande name
            </Text>
          </View>
          <View className=" flex-row space-x-1  rounded-full ">
            <FontAwesome
              style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              name="file"
              size={wp(7.5)}
              color="#fde047"
            />
            <Text
              style={{ fontSize: wp(5) }}
              className="  text-neutral-700 tracking-wide mb-2"
            >
              description
            </Text>
          </View>
          <View className=" flex-row space-x-2 ">
            <FontAwesome name="map-marker" size={wp(7.5)} color="#3b82f6" />
            <Text style={{ fontSize: wp(5) }} className="text-neutral-700 ">
              adresss & date
            </Text>
          </View>
          <View className=" flex-row space-x-2 ">
            <FontAwesome name="phone" size={wp(7.5)} color="#3b82f6" />
            <Text style={{ fontSize: wp(5) }} className="text-neutral-700 ">
              phone
            </Text>
          </View>
          <View className=" flex-row space-x-2 ">
            <FontAwesome name="calculator" size={wp(7.5)} color="#3b82f6" />
            <Text style={{ fontSize: wp(5) }} className="text-neutral-700 ">
              quantity
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default DetailsScreen;
