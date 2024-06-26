import { View, Text } from "react-native";
import React from "react";
import { AirbnbRating } from "react-native-ratings";

// Import the water image from your local file
const WATER_IMAGE = require("../assets/water.png");

const RateStar = ({ rating, setRating }) => {
  const ratingCompleted = (newRating) => {
    setRating(newRating);
  };
  return (
    <View>
      {/* Single line of stars */}
      <AirbnbRating
        count={5}
        reviews={["Terrible", "Bad", "Meh", "Good", "Great"]}
        defaultRating={0}
        size={24}
        onFinishRating={ratingCompleted}
        reviewSize={14}
        starContainerStyle={{ flexDirection: "row" }}
      />
    </View>
  );
};

export default RateStar;
