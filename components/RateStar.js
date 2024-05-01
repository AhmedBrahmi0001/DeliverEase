import { View, Text } from "react-native";
import React from "react";
import { AirbnbRating } from "react-native-ratings";

// Import the water image from your local file
const WATER_IMAGE = require("../assets/water.png");

// Define the ratingCompleted function to handle the completion of a rating
const ratingCompleted = (rating) => {
  console.log("Rating is:", rating);
};

const RateStar = () => {
  return (
    <View>
      {/* Single line of stars */}
      <AirbnbRating
        count={5} // Number of stars (1 to 5 rating)
        reviews={["Terrible", "Bad", "Meh", "Good", "Great"]} // Custom labels for each rating level
        defaultRating={0} // Initial rating value
        size={24} // Size of each star (adjust as needed)
        onFinishRating={ratingCompleted} // Handle rating completion
        reviewSize={14} // Font size of review labels (optional, adjust as needed)
        starContainerStyle={{ flexDirection: "row" }} // Align stars in one line
      />
    </View>
  );
};

export default RateStar;
