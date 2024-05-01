import {
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  Touchable,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import App from "../App";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 jsutify-center bg-violet-400 h-full">
      <View className="flex-1 flex justify-center items-center m-4">
        <Animated.Text
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className="text-white font-bold text-4xl text-center"
        >
          let's get Started
        </Animated.Text>
        <View className="flex-row justify-center">
          <Animated.Image
            entering={FadeInUp.delay(200).duration(1000).springify()}
            source={require("../assets/images/welcome.png")}
            style={{ width: 400, height: 350 }}
          />
        </View>
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          className="space-y-4"
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Sign Up")}
            className="py-3 bg-white mx-7 rounded-xl w-72"
          >
            <Text className="text-xl font-bold text-center text-black">
              Sign Up
            </Text>
          </TouchableOpacity>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-semibold">Log In</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text className="text-white font-semibold">
              Already have an account ?
            </Text>
          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
