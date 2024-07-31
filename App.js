import HomeScreen from "./screens/HomeScreen";
import OrderScreen from "./screens/OrderScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "./screens/Welcome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogBox } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PaperProvider } from "react-native-paper";
import DriverScreen from "./screens/DriverScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SignUpScreen from "./(auth)/SignUpScreen";
import SignInScreen from "./(auth)/SignInScreen";
import OTPEntryScreen from "./(auth)/OTPEntryScreen";
import RegistreScreen from "./(auth)/RegistreScreen";
import OrderList from "./screens/OrderList";
import RegisterScreen from "./(auth)/RegistreScreen";
import DetailsScreen from "./screens/DetailsScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import HistoryScreen from "./screens/HistoryScreen";
import TrackingScreen from "./screens/TrackingScreen";
import HelloScreen from "./screens/HelloScreen";
import NewScreen from "./screens/NewScreen";
import TripDetailsScreen from "./screens/TripDetailsScreen";
import EnableLocationScreen from "./screens/EnableLocationScreen";
import TrackTripsScreen from "./screens/TrackTripsScreen";
import ReviewScreen from "./screens/ReviewScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ComplaintScreen from "./screens/ComplaintScreen";
import TermsOfServiceScreen from "./screens/TermsOfServiceScreen";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";
import { AuthProvider } from "./context/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreAllLogs(["Non-serializable value found in the navigation state"]);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: true,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <NavigationContainer>
          <AuthProvider>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                options={{ headerShown: false }}
                component={HomeTabs}
              />

              <Stack.Screen
                name="Order"
                options={{ headerShown: false }}
                component={OrderScreen}
              />
              <Stack.Screen
                name="Driver"
                options={{ headerShown: false }}
                component={DriverScreen}
              />
              <Stack.Screen
                name="OrderList"
                options={{ headerShown: false }}
                component={OrderList}
              />

              <Stack.Screen
                name="Sign Up"
                options={{ headerShown: false }}
                component={SignUpScreen}
              />
              <Stack.Screen
                name="SignIn"
                options={{ headerShown: false }}
                component={SignInScreen}
              />
              <Stack.Screen
                name="Registre"
                options={{ headerShown: false }}
                component={RegistreScreen}
              />
              <Stack.Screen
                name="OTP"
                options={{ headerShown: false }}
                component={OTPEntryScreen}
              />
              <Stack.Screen
                name="Profile"
                options={{ headerShown: false }}
                component={ProfileScreen}
              />
              <Stack.Screen
                name="Welcome"
                options={{ headerShown: false }}
                component={Welcome}
              />
              <Stack.Screen
                name="Details"
                options={{ headerShown: false }}
                component={DetailsScreen}
              />

              <Stack.Screen
                name="Notification"
                options={{ headerShown: false }}
                component={NotificationsScreen}
              />
              <Stack.Screen
                name="New"
                options={{ headerShown: false }}
                component={NewScreen}
              />
              <Stack.Screen
                name="History"
                options={{ headerShown: false }}
                component={HistoryScreen}
              />
              <Stack.Screen
                name="Tracking"
                options={{ headerShown: false }}
                component={TrackingScreen}
              />
              <Stack.Screen
                name="Hello"
                options={{ headerShown: false }}
                component={HelloScreen}
              />
              <Stack.Screen
                name="Trip"
                options={{ headerShown: false }}
                component={TripDetailsScreen}
              />
              <Stack.Screen
                name="terms"
                options={{ headerShown: false }}
                component={TermsOfServiceScreen}
              />
              <Stack.Screen
                name="privacy"
                options={{ headerShown: false }}
                component={PrivacyPolicyScreen}
              />
              <Stack.Screen
                name="Enable"
                options={{ headerShown: false }}
                component={EnableLocationScreen}
              />
              <Stack.Screen
                name="Track"
                options={{ headerShown: false }}
                component={TrackTripsScreen}
              />
              <Stack.Screen
                name="Review"
                options={{ headerShown: false }}
                component={ReviewScreen}
              />
              <Stack.Screen
                name="Complaint"
                options={{ headerShown: false }}
                component={ComplaintScreen}
              />
            </Stack.Navigator>
          </AuthProvider>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}

function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        // tabBarIcon: ({ focused, color, size }) => menuIcons(route, focused),
        tabBarStyle: {
          size: 16,
          // borderRadius: 12,
          // marginBottom: 12,
          // backgroundColor:'#dcdcdc',
        },
        // tabBarItemStyle: {
        //   color: "#ff0000",
        //   marginBottom: 16,
        //   zIndex: 9999,
        // },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          // tabBarInactiveTintColor: "white",
          // tabBarActiveTintColor: "white",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="DetailsOrder"
        component={TrackTripsScreen}
        options={{
          title: "Details",
          // tabBarInactiveTintColor: "white",
          // tabBarActiveTintColor: "white",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-bag" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="chats"
        component={NotificationsScreen}
        options={{
          title: "Chats",
          // tabBarInactiveTintColor: "white",
          // tabBarActiveTintColor: "white",
          tabBarIcon: ({ color }) => <TabBarIcon name="wechat" color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          // tabBarInactiveTintColor: "white",
          // tabBarActiveTintColor: "white",
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default App;
