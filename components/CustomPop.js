import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

const CustomPopup = ({ visible, onClose, title, message }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text style={{ fontSize: 20, marginBottom: 10 }}>{title}</Text>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>{message}</Text>
          <TouchableOpacity
            onPress={onClose}
            style={{ backgroundColor: "#3b82f6", padding: 10, borderRadius: 5 }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomPopup;
