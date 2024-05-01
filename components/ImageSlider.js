/*import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { sliderImages } from "../constants";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ImageSlider = () => {
  return (
    <Carousel
      data={sliderImages}
      loop={true}
      autoPlay={true}
      renderItem={ItemCard}
      hasParallaxImages={true}
      sliderWidth={wp(100)}
      firstItem={1}
      autoplayInterval={4000}
      itemWidth={wp(60) - 20}
      slideStyle={{ display: "flex ", alignItems: "center" }}
    />
  );
};
const ItemCard = ({ index, item }, Parallaxprops) => {
  return (
    <View style={{ width: wp(60) - 20, height: hp(15) }}>
      <TouchableOpacity className="mb-1">
        <Text style={{ color: "black" }} className="font-semibold">
          See All
        </Text>
      </TouchableOpacity>
      <ParallaxImage
        source={item}
        containerStyle={{ borderRadius: 30, flex: 1 }}
        style={{ resizeMode: "contain" }}
        parallaxFactor={1}
        {...Parallaxprops}
      />
    </View>
  );
};

export default ImageSlider;*/
