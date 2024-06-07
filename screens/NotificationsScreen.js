import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useNotificationModels,
  useMarkNotificationAsRead,
  useMarkAllNotificationAsRead,
} from "../hooks/notification.api";

const NotificationsScreen = () => {
  //fetch notifications
  const {
    data: notifications,
    error,
    isloading,
    refetch,
  } = useNotificationModels();
  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationAsRead();
  //mark as read for one notification
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsReadMutation.mutateAsync({ notificationId });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  //Render loading state
  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsReadMutation.mutateAsync(undefined);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
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

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        item?.is_read && styles.readNotification,
      ]}
      onPress={() => handleMarkAsRead(item?.id)}
    >
      <View style={styles.iconContainer}>
        <Icon
          source={item?.is_read ? "bell" : "bell-ring"}
          size={20}
          color={item?.isRead ? "gray" : "#3b82f6"}
        />
      </View>
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationTitle}>{item?.title}</Text>
        <Text style={styles.notificationText}>{item?.text}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No notifications</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity onPress={handleMarkAllAsRead}>
          <Text style={styles.markAsReadAll}>Mark All as Read</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications?.data}
        keyExtractor={(item) => (item?.id ? item.id.toString() : "")}
        renderItem={renderNotificationItem}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  markAsReadAll: {
    color: "#3b82f6",
    fontWeight: "bold",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  readNotification: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 16,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  notificationText: {
    fontSize: 16,
    color: "gray",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 18,
    color: "gray",
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

export default NotificationsScreen;
