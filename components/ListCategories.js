import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { SegmentedButtons } from "react-native-paper";
import PriceSlider from "./PriceSlider";
import RateStar from "./RateStar";
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import Places from "./Places";

const ListCategories = () => {
  // State to track the selected button value
  const [value, setValue] = useState("");

  // Define custom styles for the component
  const styles = {
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    buttonGroup: {
      marginBottom: 16,
    },
    buttonStyle: {
      margin: 8,
      // padding: 8,
      // borderRadius: 10,
      borderWidth: 1,
      borderColor: "#007BFF",
      backgroundColor: "#FFFFFF",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
    },
    selectedButtonStyle: {
      backgroundColor: "#007BFF",
      borderColor: "#007BFF",
      shadowColor: "transparent",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    unselectedButtonStyle: {
      backgroundColor: "#F0F0F0",
      borderColor: "#CCC",
    },
    buttonText: {
      color: "#000",
      fontWeight: "bold",
    },
    selectedButtonText: {
      color: "#FFFFFF",
    },
  };

  // Function to handle button press
  const handleButtonPress = (buttonValue) => {
    if (value === buttonValue) {
      // Reset value to empty string if the button is already selected
      setValue("");
    } else {
      // Set the selected button value
      setValue(buttonValue);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Segmented buttons with consistent styles */}
      <SegmentedButtons
        value={value}
        onValueChange={handleButtonPress}
        buttons={[
          {
            value: "rate",
            label: "Rating",
            style: [
              styles.buttonStyle,
              value === "rate"
                ? styles.selectedButtonStyle
                : styles.unselectedButtonStyle,
            ],
            labelStyle:
              value === "rate" ? styles.selectedButtonText : styles.buttonText,
          },
          {
            value: "price",
            label: "Prices",
            style: [
              styles.buttonStyle,
              value === "price"
                ? styles.selectedButtonStyle
                : styles.unselectedButtonStyle,
            ],
            labelStyle:
              value === "price" ? styles.selectedButtonText : styles.buttonText,
          },
          {
            value: "drive",
            label: "Driving",
            style: [
              styles.buttonStyle,
              value === "drive"
                ? styles.selectedButtonStyle
                : styles.unselectedButtonStyle,
            ],
            labelStyle:
              value === "drive" ? styles.selectedButtonText : styles.buttonText,
          },
        ]}
      />

      {/* Conditionally render components based on the selected value */}
      {value === "price" && <PriceSlider />}
      {value === "rate" && <RateStar />}
      {value === "drive" && <Places />}
    </SafeAreaView>
  );
};

export default ListCategories;
