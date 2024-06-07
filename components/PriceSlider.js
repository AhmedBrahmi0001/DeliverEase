import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import RangeSlider from "rn-range-slider";

const PriceSlider = () => {
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(400);

  const handleValueChange = useCallback((newLow, newHigh) => {
    setLow(newLow);
    setHigh(newHigh);
  }, []);

  const renderThumb = useCallback(() => <View style={styles.thumb} />, []);
  const renderRail = useCallback(() => <View style={styles.rail} />, []);
  const renderRailSelected = useCallback(
    () => <View style={styles.railSelected} />,
    []
  );
  const renderLabel = useCallback(
    (value) => <Text style={styles.label}>{`TN ${value}`}</Text>,
    []
  );
  const renderNotch = useCallback(() => <View style={styles.notch} />, []);

  return (
    <View style={styles.container}>
      <RangeSlider
        style={styles.slider}
        min={0}
        max={400}
        step={1}
        low={low}
        high={high}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
    marginTop: 16,
    backgroundColor: "#D7DBDD",
    borderRadius: 10,
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: "#1079e3",
    borderRadius: 10,
  },
  rail: {
    height: 4,
    backgroundColor: "#E0E0E0",
  },
  railSelected: {
    height: 4,
    backgroundColor: "#1079e3",
  },
  label: {
    color: "#333",
    fontWeight: "bold",
  },
  notch: {
    width: 8,
    height: 8,
    backgroundColor: "#FF9500",
    borderRadius: 4,
  },
  slider: {
    flex: 1,
  },
});

export default PriceSlider;
