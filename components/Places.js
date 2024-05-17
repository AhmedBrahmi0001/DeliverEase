import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../theme";

const Places = () => {
  const places = ["Place 1", "Place 2", "Place 3", "Place 4", "Place 5"];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
      >
        {places.map((place, index) => (
          <TouchableOpacity key={index} style={styles.placeButton}>
            <Text style={styles.placeText}>{place}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 16,
    backgroundColor: "#f5f5f5",
  },
  scrollViewContent: {
    paddingHorizontal: wp(3),
    marginTop: hp(1),
  },
  placeButton: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    backgroundColor: theme.secondary,
    borderRadius: wp(2),
    marginRight: wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  placeText: {
    fontWeight: "bold",
    fontSize: wp(4),
    color: "#1079e3",
    textTransform: "capitalize",
  },
});

export default Places;
