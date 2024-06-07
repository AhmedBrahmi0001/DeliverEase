import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { usePlaceModels } from "../hooks/places.api";

const Places = () => {
  //fetch places
  const { data: places, error, isloading } = usePlaceModels();

  // Render loading state
  if (isloading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }
  // Check if places is undefined
  if (!places?.data?.length) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No places found.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
      >
        {places?.data?.map((place, index) => (
          <TouchableOpacity key={index} style={styles.placeButton}>
            <Text style={styles.placeText}>{place?.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#D7DBDD",
    borderRadius: 10,
  },
  scrollViewContent: {
    // paddingHorizontal: wp(3),
    // marginTop: hp(1),
    alignItems: "center",
  },
  placeButton: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    backgroundColor: "#fff",
    borderRadius: wp(2),
    marginRight: wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  placeText: {
    fontWeight: "600",
    fontSize: wp(4),
    color: "#333",
  },
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

export default Places;
