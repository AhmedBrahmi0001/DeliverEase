import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "./axiosClient"; // Adjust the path based on your project structure

export const useRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("deliverEase");
        console.log(accessToken);
        if (accessToken) {
          setIsSignedIn(true);
          const roleResponse = await axiosClient.get("auth/role", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setRole(roleResponse.data.role);
        } else {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error("Failed to fetch role", error);
        setIsSignedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  return { role, loading, isSignedIn };
};
