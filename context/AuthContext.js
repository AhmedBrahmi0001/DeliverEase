import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../axiosClient"; // Adjust the path based on your project structure
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("deliverEase");
        if (accessToken) {
          const response = await axiosClient.get("auth/user", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setAuthInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (!authInitialized) return;

    if (!user) {
      navigation.navigate("SignIn");
    }
  }, [authInitialized, user]);

  const login = async (email, password) => {
    try {
      const response = await axiosClient.post("login", {
        email,
        password,
      });
      const userData = response.data;
      setUser(userData);
      await AsyncStorage.setItem("deliverEase", userData.accessToken);
      await AsyncStorage.setItem("role", userData.role);
      return { data: userData, error: null };
    } catch (error) {
      setUser(null);
      return { data: null, error: error.response?.data || error.message };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("deliverEase");
      setUser(null);
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const register = async (name, email, password, phoneNumber) => {
    try {
      const response = await axiosClient.post("register", {
        name,
        email,
        password,
        phone_number: phoneNumber,
      });
      const userData = response.data;
      setUser(userData);
      await AsyncStorage.setItem("deliverEase", userData.accessToken);
      return { data: userData, error: null };
    } catch (error) {
      setUser(null);
      return { data: null, error: error.response?.data || error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, authInitialized, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
